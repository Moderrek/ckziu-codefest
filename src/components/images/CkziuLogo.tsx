import NextImage from '@/components/NextImage';

const CkziuLogo = (props: { width: number; height: number }) => {
  return (
    <NextImage
      useSkeleton={true}
      alt='CKZiU Logo'
      src='/images/ckziu-cropped.svg'
      width={props.width}
      height={props.height}
      className='hover:animate-hover-logo'
      fetchPriority='high'
    />
  );
};

export default CkziuLogo;
