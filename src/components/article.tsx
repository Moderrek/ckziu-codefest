import { Button, Tooltip } from '@material-tailwind/react';

import { ApiArticleData } from '@/lib/api/api_responses';

import UnstyledLink from './links/UnstyledLink';

export default function Article(props: { article: ApiArticleData | null }) {
  if (props.article === null) {
    return (
      <div className="card glass min-h-28 w-80 md:w-96">
        <div className="card-body">
          <h2 className="card-title w-full animate-pulse">
            <span className="h-5 w-1/4 rounded-3xl bg-secondary"></span>
            <span className="h-5 w-1/4 rounded-3xl bg-secondary"></span>
            <span className="h-5 w-1/2 rounded-3xl bg-secondary"></span>
          </h2>
          <p className="h-20 w-full animate-pulse rounded-3xl bg-secondary"></p>
          <div className="card-actions justify-end">
            <Button
              variant="outlined"
              color="indigo"
              placeholder={undefined}
              loading={true}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Czytaj
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card glass min-h-28 w-80 md:w-96">
      <div className="card-body">
        <h2 className="card-title">{props.article.title}</h2>
        <p>{props.article.description}</p>
        <div className="card-actions justify-end">
          <UnstyledLink href={props.article.url}>
            <Tooltip content="Przejdziesz na stronę szkoły.">
              <Button
                variant="outlined"
                color="indigo"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Czytaj
              </Button>
            </Tooltip>
          </UnstyledLink>
        </div>
      </div>
    </div>
  );
}
