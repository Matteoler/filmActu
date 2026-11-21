import React from "react";
import {Footer, Header, PresentationFilm, PresentationSerie, SortieRecente} from "@/components";

export default function Home() {
  return (
      <>
          <Header/>
          <main>
              <PresentationFilm/>
              <PresentationSerie/>
              <SortieRecente/>
          </main>
          <Footer/>
      </>
  );
}
