import NextImage from '@/components/NextImage';

export default function Homepage() {
  return (
    <div className='hero'>
      <NextImage
        src='/images/ckziu_thumbnail.png'
        alt='ckziu_thumbnail'
        width={1140}
        height={760}
        className='bg-cover'
      />
    </div>
  );
}
