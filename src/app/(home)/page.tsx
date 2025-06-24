"use client"

import { trpc } from "@/trpc/client";

export default function Home() {

  const { data } = trpc.hello.useQuery({ text: "Kyuleelim" })

  return (
    <div>
      Client component say : {data?.greeting}
    </div>
  );
}
