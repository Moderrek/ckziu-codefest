import NextImage from '@/components/NextImage';

const CkziuLogo = (props: { width: number; height: number }) => {
  return (
    <NextImage
      useSkeleton={true}
      alt='CKZiU Logo'
      src='/images/ckziu_logo.png'
      width={props.width}
      height={props.height}
    />
  );
};

export default CkziuLogo;