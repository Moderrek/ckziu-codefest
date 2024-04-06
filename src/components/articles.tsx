import useSWR from 'swr'
import ArticleEmpty from "@/components/emptyarticle";
import Article from "@/components/article";
import {ApiArticlesData} from "@/lib/api_responses";
import {API_URL} from "@/lib/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ArticleSection() {
  const {data, error} = useSWR<ApiArticlesData, Error>(API_URL + '/article', fetcher)

  // Show empty skeleton articles while loading or error.
  if (!data || error) return (<>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
  </>)

  // Render articles
  return (<>
      {data.map((article, idx) => {
        return (
          <Article key={idx} article={article}/>
        )
      })}
    </>
  )
}