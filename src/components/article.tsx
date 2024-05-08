import { Button, Tooltip } from '@material-tailwind/react';

import { ApiArticleData } from '@/lib/api/api_responses';

import UnstyledLink from './links/UnstyledLink';

export default function Article(props: { article: ApiArticleData | null }) {
  if (props.article === null) {
    return (
      <div className='card glass w-96 min-h-28'>
      <div className='card-body'>
        <h2 className='card-title animate-pulse w-full'><span className='bg-secondary rounded-3xl h-5 w-1/4'></span><span className='bg-secondary rounded-3xl h-5 w-1/4'></span><span className='bg-secondary rounded-3xl h-5 w-1/2'></span></h2>
        <p className='w-full h-20 animate-pulse bg-secondary rounded-3xl'></p>
        <div className='card-actions justify-end'>
            <Button variant='outlined' color='indigo' placeholder={undefined} loading={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Czytaj
          </Button>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className='card glass w-96 min-h-28'>
      <div className='card-body'>
        <h2 className='card-title'>{props.article.title}</h2>
        <p>{props.article.description}</p>
        <div className='card-actions justify-end'>
          <UnstyledLink href={props.article.url}>
            <Tooltip content='Przejdziesz na stronę szkoły.'>
            <Button variant='outlined' color='indigo' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Czytaj
          </Button>
            </Tooltip>
          </UnstyledLink>
        </div>
      </div>
    </div>
  );
}
