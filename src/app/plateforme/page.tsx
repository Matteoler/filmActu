import React from "react";
import {Footer, Header, PresentationPlateforme} from "@/components";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Plateformes de streaming | StreamFinder",
    description: "Découvrez les différentes plateformes de streaming disponibles et leurs catalogues"
}

export default function Plateforme() {
    return (
        <>
            <Header/>
            <main>
                <PresentationPlateforme/>
            </main>
            <Footer/>
        </>
    );
}
