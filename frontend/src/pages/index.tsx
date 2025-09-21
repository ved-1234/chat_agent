import Head from "next/head";
import ChatWidget from "../components/ChatWidget";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Chat Agent</title>
        {/* Favicon link */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <ChatWidget />
      </div>
    </>
  );
}
