import UnstyledLink from '@/components/links/UnstyledLink';
import { Button, Tooltip } from '@material-tailwind/react';
import { Plus } from 'lucide-react';
import { useName } from '@/globalstate/useName';

const ParticipateButton = () => {
  const name = useName();

  return (
    <Tooltip content='Zgłoś swoją pracę do konkursu.'>
      <UnstyledLink href={name ? `/p/${name}` : '/zaloguj'} className='w-1/2'>
        <Button
          variant='gradient'
          color='green'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className='flex flex-row flex-1 min-w-fit items-center justify-center gap-1 w-full'
        >
          <Plus className='w-6 h-6' /> Weź udział
        </Button>
      </UnstyledLink>
    </Tooltip>
  );
};

export { ParticipateButton };
