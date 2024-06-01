import Image, { ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  loadingClassName?: string;
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: "fill"; width?: string | number; height?: string | number }
  ) &
  ImageProps;

/**
 * Uses Next/{@link Image}
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
const NextImage = ({
                     useSkeleton = false,
                     src,
                     width,
                     height,
                     alt,
                     className,
                     imgClassName,
                     loadingClassName,
                     ...rest
                   }: NextImageProps) => {
  const COMPLETE = false;
  const [loading, setLoading] = useState<boolean>(useSkeleton);

  return (
    <figure className={className}>
      <Image
        className={cn(
          imgClassName,
          loading && cn("animate-pulse", loadingClassName)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setLoading(COMPLETE)}
        {...rest}
      />
    </figure>
  );
};

export type { NextImageProps };
export default NextImage;