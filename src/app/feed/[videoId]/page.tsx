interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  console.log("server componenet")

  const { videoId } = await params

  return (
    <div>
      Video Id {videoId}
    </div>
  )
}

export default Page;