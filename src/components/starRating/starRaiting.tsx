'use client';

import React, { useId } from 'react';

const labels = [
    'Nul', 'Très mauvais', 'Mauvais', 'Pas terrible', 'Moyen',
    'Pas mal', 'Bien', 'Très bien', 'Excellent', 'Chef-d\'œuvre'
];

type StarRatingProps = {
    rating: number;
    setRatingAction?: (val: number) => void;
    hoveredRating?: number | null;
    setHoveredRatingAction?: (val: number | null) => void;
    readOnly?: boolean;
};

export function StarRating({
                               rating,
                               setRatingAction,
                               hoveredRating,
                               setHoveredRatingAction,
                               readOnly = false
                           }: StarRatingProps) {
    // Générer un ID unique pour chaque instance du composant
    const uniqueId = useId();

    const starPath =
        'M287.9 17.8L354 150.2l146.4 21.3c26.2 3.8 36.7 36 17.7 54.6L416 347.3l25 145.5c4.5 26.2-23 46-46.4 33.7L288 439.6 181.4 526.5c-23.4 12.3-50.9-7.4-46.4-33.7l25-145.5-102.1-99.2c-19-18.6-8.5-50.8 17.7-54.6L222 150.2 288 17.8z';

    const displayValue = hoveredRating ?? rating;
    const labelIndex = Math.floor(displayValue * 2) - 1;
    const currentLabel = labels[labelIndex] ?? '';

    return (
        <div className="flex gap-3 relative">
            {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                const starValueLeft = starIndex - 0.5;
                const starValueRight = starIndex;

                // Utiliser l'ID unique pour créer des identifiants de gradient uniques
                const fillId = `half-fill-${uniqueId}-${index}`;

                let percentage = 0;
                if (displayValue >= starValueRight) {
                    percentage = 100;
                } else if (displayValue >= starValueLeft) {
                    percentage = 50;
                }

                return (
                    <div key={index} className="relative flex flex-col items-center group">
                        {(hoveredRating !== null && displayValue >= starValueLeft && displayValue < starValueRight + 0.5) && (
                            <div className="absolute -top-10 text-sm text-white bg-black px-2 py-1 rounded shadow">
                                {currentLabel}
                            </div>
                        )}
                        <svg
                            viewBox="0 0 576 512"
                            className={`w-10 h-10 ${!readOnly ? 'cursor-pointer' : 'cursor-default'}`}
                            onMouseMove={(e) => {
                                if (readOnly) return;
                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                const isLeft = e.clientX - left < width / 2;
                                setHoveredRatingAction?.(isLeft ? starValueLeft : starValueRight);
                            }}
                            onMouseLeave={() => {
                                if (readOnly) return;
                                setHoveredRatingAction?.(null);
                            }}
                            onClick={(e) => {
                                if (readOnly) return;
                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                const isLeft = e.clientX - left < width / 2;
                                setRatingAction?.(isLeft ? starValueLeft : starValueRight);
                            }}
                        >
                            <defs>
                                <linearGradient id={fillId}>
                                    <stop offset={`${percentage}%`} stopColor="gold" />
                                    <stop offset={`${percentage}%`} stopColor="lightgray" />
                                </linearGradient>
                            </defs>
                            <path d={starPath} fill={`url(#${fillId})`} />
                        </svg>
                    </div>
                );
            })}
        </div>
    );
}