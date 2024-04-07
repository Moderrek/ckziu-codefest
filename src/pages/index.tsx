import ArticleSection from "@/components/articles";
import Homepage from "@/components/homepage";

export default function Home() {
  return (
    <>
      {/*<Navbar/>*/}
      <div className="flex h-screen flex-col">
        <div className="m-auto">
          <div className="flex flex-wrap justify-center mt-10">
            <ArticleSection/>
          </div>
        </div>
      </div>
      <Homepage/>
    </>
  );
}
