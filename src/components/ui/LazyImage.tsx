"use client";
import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type LazyImageProps = ImageProps & {
  containerClassName?: string;
};

export function LazyImage({ src, alt, className, containerClassName, priority, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Use useEffect to handle priority prop correctly, ensuring loading state is set initially
  useEffect(() => {
    if (priority) {
      setIsLoading(false); // Assume priority images load fast or are critical
    }
  }, [priority]);

  if (isError || !src) {
    // Fallback for error or missing src
    const placeholderText = alt || "Image unavailable";
    const fallbackWidth = typeof props.width === 'number' ? props.width : 300;
    const fallbackHeight = typeof props.height === 'number' ? props.height : 200;
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          containerClassName
        )}
        style={{ width: fallbackWidth, height: fallbackHeight }}
        role="img"
        aria-label={placeholderText}
      >
        <span className="text-xs p-2 text-center">{placeholderText}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(
        "transition-opacity duration-300 ease-in-out object-cover w-full h-full",
        isLoading && !priority ? "opacity-0" : "opacity-100",
        className
      )}
      onLoad={() => setIsLoading(false)}
      onError={(e) => {
        console.error("Image error", e.target);
        setIsLoading(false);
        setIsError(true);
      }}
      priority={priority} // Pass priority to NextImage
      layout="fill"
      {...props}
    />
  );
}
