import { CircleHelp } from 'lucide-react';

const RewardCard = (props: { thumbnail: string; rewardName: string }) => {
  const { thumbnail, rewardName } = props;

  return (
    <div className='bg-card relative h-[250px] w-[250px] overflow-hidden rounded-3xl shadow-xl'>
      <div className='absolute inset-x-0 z-10 translate-x-[25px] translate-y-[25px]'>
        {/*<NextImage alt={rewardName} src={thumbnail} width={200} height={200} />*/}
        <CircleHelp width='200px' height='200px' />
      </div>
      {/*<p>{rewardName}</p>*/}
    </div>
  );
};

export { RewardCard };
