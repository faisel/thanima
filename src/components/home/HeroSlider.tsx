// @ts-nocheck
"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LazyImage } from "@/components/ui/LazyImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Slide {
  image: string;
  alt: string;
  data_ai_hint?: string;
  headline: string;
  sub: string;
  cta: string;
  link: string;
}

interface HeroSliderProps {
  slides: Slide[];
  locale: string;
}

export function HeroSlider({ slides, locale }: HeroSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
 
  useEffect(() => {
    if (!api) {
      return;
    }
 
    setCurrent(api.selectedScrollSnap() + 1);
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full" aria-roledescription="carousel" aria-label="Promotional content">
      <Carousel 
        setApi={setApi}
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] w-full">
                <LazyImage
                  src={slide.image}
                  alt={slide.alt || slide.headline}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50" // Tailwind JIT needs full class name, not computed
                  priority={index === 0} // Preload first image
                  data-ai-hint={slide.data_ai_hint}
                />
                <div className="absolute inset-0 flex items-center justify-center md:justify-start p-6 md:p-12 lg:p-24">
                  <div className="text-center md:text-left max-w-md lg:max-w-lg text-white animate-slide-up-fade">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-semibold mb-4 drop-shadow-md">
                      {slide.headline}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl mb-6 drop-shadow-sm">
                      {slide.sub}
                    </p>
                    <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground transform transition-transform hover:scale-105 group">
                      <Link href={slide.link} target="_blank" rel="noopener noreferrer">
                        {slide.cta}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
        </div>
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${current === index + 1 ? 'bg-primary w-4' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
