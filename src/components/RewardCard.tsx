import NextImage from '@/components/NextImage';

const RewardCard = (props: { thumbnail: string, rewardName: string }) => {
  const { thumbnail, rewardName } = props;

  return (
    <div className='overflow-hidden rounded-3xl bg-whitr shadow-2xl relative h-[250px] w-[250px]'>
      <div className="absolute inset-x-0 z-10 translate-x-[25px] translate-y-[25px]">
        <NextImage alt={rewardName} src={thumbnail} width={200} height={200} />
      </div>
      {/*<p>{rewardName}</p>*/}
    </div>
  );
};

export { RewardCard };
