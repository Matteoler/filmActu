'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface FilmCarouselProps {
    genres: string[];
}

export function FilmCarousel({genres}: FilmCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
    });

    const scrollPrev = () => {
        if (emblaApi) emblaApi.scrollPrev();
    };

    const scrollNext = () => {
        if (emblaApi) emblaApi.scrollNext();
    };

    return (
        <div className="relative max-w-[95%] mx-auto my-8">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {genres.map((genre, index) => (
                        <button
                            key={index}
                            className="flex-none px-6 py-3 bg-gray-800 text-white rounded-full 
                                     hover:bg-gray-700 transition-colors duration-200"
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full
                         bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
            >
                <ChevronLeft size={24}/>
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full
                         bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
            >
                <ChevronRight size={24}/>
            </button>
        </div>
    );
}