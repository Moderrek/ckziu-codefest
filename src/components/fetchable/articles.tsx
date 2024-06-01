import useSWR from "swr";

import { API_V1 } from "@/lib/api/api";
import { ApiArticlesData } from "@/lib/api/api_responses";

import Article from "@/components/article";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticleSection() {
  const { data, error } = useSWR<ApiArticlesData, Error>(
    API_V1 + "/ckziu/news",
    fetcher
  );

  // Show empty skeleton articles while loading or error.
  if (!data || error)
    return (
      <>
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
        <Article article={null} />
      </>
    );

  // Render articles
  return (
    <>
      {data.map((article, idx) => {
        return <Article key={idx} article={article} />;
      })}
    </>
  );
}
