import { Button, Tooltip } from '@material-tailwind/react';
import { Book } from 'lucide-react';

import UnstyledLink from '@/components/links/UnstyledLink';

const CodeFestRulesButton = () => {
  return (
    <Tooltip content="Czytaj regulamin na stronie szkoły.">
      <UnstyledLink href="/regulamin" className="w-1/2">
        <Button
          variant="gradient"
          color="red"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex w-full min-w-fit flex-1 flex-row items-center justify-center gap-1"
        >
          <Book className="size-6" /> Regulamin konkursu
        </Button>
      </UnstyledLink>
    </Tooltip>
  );
};

export { CodeFestRulesButton };
