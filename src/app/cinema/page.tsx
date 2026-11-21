import React from "react";
import {Header,FilmCarousel,SortieRecente} from "@/components";

export default function Film() {
    return (
        <>
            <Header/>
            <main>
                <FilmCarousel
                    genres={[
                        "Aventure",
                        "Science-Fiction",
                        "Fantastique",
                        "Action",
                        "Comédie",
                        "Drame",
                        "Horreur",
                        "Romance"
                    ]}
                />
                <SortieRecente/>
            </main>
        </>
    );
}