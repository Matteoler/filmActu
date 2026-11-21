"use client";

import React, { useState, useEffect } from "react";
import { getUser } from "@/lib/auth-session";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
}

interface SearchResult {
    id: number;
    title: string;
    type: "film" | "serie";
    posterUrl: string;
}

export function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    const imagePathSerie = '/assets/affiche/serie/';
    const imagePathMovie = '/assets/affiche/film/';

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser || null);
        };

        fetchUser();
    }, []);

    const handleSignOut = async () => {
        await signOut();
        router.push("/auth/signin");
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length > 2) {
            try {
                const response = await fetch(`/api/search?query=${term}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la recherche");
                }
                const data: SearchResult[] = await response.json();
                setSearchResults(data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Erreur de recherche :", error);
            }
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        router.push(`/${result.type}/${result.id}`);
        setSearchTerm("");
        setShowDropdown(false);
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className={"grid-container"}>
                <nav className={"flex items-center justify-between py-4"}>
                    <Image src="/assets/logo-petit.png" alt={""} className={"span-w-1"} width={128} height={128} />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un film ou une série"
                            className="px-4 span-w-2 py-2 rounded bg-white text-Blue"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {showDropdown && searchResults.length > 0 && (
                            <ul className="absolute bg-white text-black mt-2 w-full rounded shadow-lg z-10">
                                {searchResults.map((result) => (
                                    <li
                                        key={result.id}
                                        className="p-2 hover:bg-gray-300 rounded cursor-pointer flex items-center"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <img
                                            src={`${result.type === 'film' ? imagePathMovie : imagePathSerie}${result.posterUrl}`}
                                            alt={result.title}
                                            className="w-10 h-10 object-cover rounded mr-2"
                                        />
                                        <span>{result.title}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className="flex space-x-4">
                        <li><Link href="/plateforme" className="hover:underline">Streaming</Link></li>
                        <li><Link href="/film" className="hover:underline">Cinéma</Link></li>
                        <li><Link href="/series" className="hover:underline">Séries</Link></li>
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        {user ? (
                            <li>
                                <Link
                                    href="#"
                                    className="hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSignOut();
                                    }}
                                >
                                    {user.email}
                                </Link>
                            </li>
                        ) : (
                            <li><Link href="/auth/signin" className="hover:underline">Login</Link></li>
                        )}
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}