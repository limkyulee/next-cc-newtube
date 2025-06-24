import { trpc } from "@/trpc/server";

export default async function Home() {

  const data = await trpc.hello({ text: "Kyuleelim" })

  return (
    <div>
      Client component say : {data.greeting}
    </div>
  );
}
