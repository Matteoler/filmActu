'use client';

import React, { useState, useEffect } from 'react';
import { StarRating } from '@/components';
import { cn } from '@/lib/utils';

// Interface pour typer les commentaires
interface Comment {
    id: number;
    content: string;
    rating: number;
    userId: string;
    userName: string;
    userImage?: string;
    createdAt: string;
}

type CommentsProps = {
    movieId?: number;
    seriesId?: number;
    userId: string;
};

export function Comments({ movieId, seriesId, userId }: CommentsProps) {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(true);

    // Charger les commentaires existants
    useEffect(() => {
        async function fetchComments() {
            try {
                const queryParams = new URLSearchParams();
                if (movieId) queryParams.append('movieId', movieId.toString());
                if (seriesId) queryParams.append('seriesId', seriesId.toString());

                const response = await fetch(`/api/comment?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des commentaires');
                }

                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoadingComments(false);
            }
        }

        fetchComments();
    }, [movieId, seriesId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, rating, movieId, seriesId, userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de l\'ajout du commentaire.');
            }

            const newComment = await response.json();

            // Ajouter le nouveau commentaire à la liste
            setComments(prevComments => [newComment, ...prevComments]);

            alert('Commentaire ajouté avec succès !');
            setContent('');
            setRating(0);
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Une erreur inconnue est survenue.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="comments-section">
            <h2 className="text-xl font-bold mb-6">Commentaires</h2>

            {/* Formulaire d'ajout de commentaire */}
            <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="comment" className="block mb-2 text-sm font-medium">
                        Votre avis
                    </label>
                    <textarea
                        id="comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Partagez votre expérience..."
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                        Votre note
                    </label>
                    <StarRating
                        rating={rating}
                        setRatingAction={setRating}
                        hoveredRating={hoveredRating}
                        setHoveredRatingAction={setHoveredRating}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "px-4 py-2 text-white rounded-md transition-colors",
                        loading
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-700"
                    )}
                >
                    {loading ? 'Envoi...' : 'Publier votre commentaire'}
                </button>
            </form>

            {/* Liste des commentaires existants */}
            <div className="comments-list">
                <h3 className="text-lg font-semibold mb-4">Avis des spectateurs</h3>

                {loadingComments ? (
                    <p>Chargement des commentaires...</p>
                ) : comments.length > 0 ? (
                    <ul className="space-y-6">
                        {comments.map(comment => (
                            <li key={comment.id} className="border-b pb-4">
                                <div className="flex items-start gap-3">
                                    {comment.userImage ? (
                                        <img
                                            src={comment.userImage}
                                            alt={comment.userName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span>{comment.userName}</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">{comment.userName}</span>
                                            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                                        </div>
                                        <div className="mb-2">
                                            <StarRating rating={comment.rating} readOnly />
                                        </div>
                                        <p className="text-sm">{comment.content}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">Aucun commentaire pour le moment. Soyez le premier à donner votre avis !</p>
                )}
            </div>
        </div>
    );
}