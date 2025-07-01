import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';

/**
 * @see API(procedure) 를 담는 라우터
 */
export const appRouter = createTRPCRouter({
  /**
   * @name hello
   * @description hello 라는 이름의 API
   * @input text 라는 문자열을 입력받아야 함
   * @z.object 타입과 형식을 검사
   * @query API 실행 방식
   */
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      console.log({ fromContext: opts.ctx.clerkUserId })

      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

/**
 * @see tRPC 클라이언트가 자동으로 타입을 맞추는데 사용
 */
// export type definition of API
export type AppRouter = typeof appRouter;