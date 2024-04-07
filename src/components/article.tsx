import { ApiArticleData } from '@/lib/api_responses';

import NextImage from '@/components/NextImage';

export default function Article(props: { article: ApiArticleData }) {
  return (
    <div className='card glass w-96'>
      <figure>
        <NextImage
          src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
          alt='car!'
          height={928}
          width={548}
          useSkeleton={true}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{props.article.title}</h2>
        <p>{props.article.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Czytaj</button>
        </div>
      </div>
    </div>
  );
}
