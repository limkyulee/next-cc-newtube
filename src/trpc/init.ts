import { db } from '@/db';
import { users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import superjson from 'superjson'

/**
 * @see TRPC Context 생성
 * @description 공통 정보를 생성하여 모든 API 요청에서 꺼내 사용할 수 있도록 한다.
 */
export const createTRPCContext = cache(async () => {
  // [GET] clerk 에 로그인된 유저 정보
  const { userId } = await auth();

  return { clerkUserId: userId }
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
/**
 * @see TRPC 서버 초기 설정
 */
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
/**
 * @see 인증이 필요한 API 생성 시, 사용
 */
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts

  // 로그인 한 유저가 없을 경우 UNAUTHOIZED [Exception]
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId))
    .limit(1);
  
  if(!user) {
    throw new TRPCError({code: "UNAUTHORIZED"})
  }

  // 로그인 한 유저가 있는 경우 다음 단계 진행
  return opts.next({
    ctx: {
      ...ctx,
      user
    }
  })
})