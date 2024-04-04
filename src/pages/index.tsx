import Image from "next/image";
import Navbar from "@/components/navbar"
import Homepage from "@/components/homepage";
import ArticleSection from "@/components/articles";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen flex-col">
  <div className="m-auto">
      <ArticleSection />
  </div>
</div>
      <Homepage />
    </>
  );
}
