import useSWR from 'swr';

import { API_URL } from '@/lib/api';
import { ApiArticlesData } from '@/lib/api_responses';

import Article from '@/components/article';
import ArticleEmpty from '@/components/emptyarticle';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticleSection() {
  const { data, error } = useSWR<ApiArticlesData, Error>(
    API_URL + '/article',
    fetcher
  );

  // Show empty skeleton articles while loading or error.
  if (!data || error)
    return (
      <>
        <ArticleEmpty />
        <ArticleEmpty />
        <ArticleEmpty />
        <ArticleEmpty />
        <ArticleEmpty />
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
