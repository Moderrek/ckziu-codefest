import NextImage from '@/components/NextImage';

const RewardCard = (props: { thumbnail: string; rewardName: string }) => {
  const { thumbnail, rewardName } = props;

  return (
    <div>
      <div className='bg-card relative h-[250px] w-[250px] overflow-hidden rounded-3xl shadow-2xl border-2 border-gradient-to-r'>
        <div className='absolute select-none'>
          <NextImage
            alt={rewardName}
            src={thumbnail}
            width={250}
            height={250}
            useSkeleton={true}
          />
        </div>
        <div className='absolute h-[250px] w-[250px] reward-effect'></div>
      </div>
      <p className='font-bold text-center mt-2'>{rewardName}</p>
    </div>
  );
};

export { RewardCard };
