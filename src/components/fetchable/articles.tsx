import useSWR from "swr";

import { API_V1 } from "@/lib/api/api";
import { ApiArticlesData } from "@/lib/api/api_responses";

import ArticleCard from "@/shared-components/card/ArticleCard";

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
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
        <ArticleCard article={null} />
      </>
    );

  // Render articles
  return (
    <>
      {data.map((article, idx) => {
        return <ArticleCard key={idx} article={article} />;
      })}
    </>
  );
}
