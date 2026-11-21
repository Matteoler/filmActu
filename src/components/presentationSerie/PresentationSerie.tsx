'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '@/components/Embla/EmblaCarouselArrowButtons'

type TopRatedSerie = {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
};

type TopRated = {
    topRatedSeries: TopRatedSerie[];
};

export function PresentationSerie() {
    const [topRated, setTopRated] = useState<TopRated>({ topRatedSeries: [] });
    const [loading, setLoading] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'start',
            containScroll: 'trimSnaps',
            skipSnaps: false,
            slidesToScroll: 1,
        }
    )

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const imagePathSerie = '/assets/affiche/serie/';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/film-serie');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTopRated(data);
            } catch (error) {
                console.error('Failed to fetch top rated series:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            {topRated.topRatedSeries.length > 0 ? (
                <section className="grid-container">
                    <h2 className="my-4 text-DarkBlue text-28 font-bold">Top 10 des séries</h2>
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-grid">
                            {topRated.topRatedSeries.map((serie) => (
                                <Link
                                    className="flex-none span-w-2"
                                    key={serie.id}
                                    href={`/serie/${serie.id}`}
                                >
                                    <Image
                                        className="h-100 object-cover w-full rounded-lg"
                                        src={`${imagePathSerie}${serie.posterUrl}`}
                                        alt={serie.title}
                                        width={360}
                                        height={360}
                                    />
                                    <p className="mt-2 text-center">{serie.title}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="embla__controls">
                            <div className="embla__buttons">
                                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                            </div>

                            <div className="embla__dots">
                                {scrollSnaps.map((_, index) => (
                                    <DotButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={'embla__dot'.concat(
                                            index === selectedIndex ? ' embla__dot--selected' : ''
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <p>Aucune série trouvée.</p>
            )}
        </>
    );
}
