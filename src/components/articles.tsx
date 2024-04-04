import useSWR from 'swr'
import ArticleEmpty from "@/components/emptyarticle";
import Article from "@/components/article";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ArticleSection() {
  const {data, error} = useSWR('http://25.50.65.38:3030/article', fetcher)
  console.log(data);

  if (!data || error) return (<>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
    <ArticleEmpty/>
  </>)

  return (<>
      {data.map((article) => {
        return (
          <Article article={article}/>
        )
      })}
    </>
  )
}