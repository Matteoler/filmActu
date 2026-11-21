import React from "react";

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-8">
            <div className={"grid-container"}>
                <nav className={"flex items-center justify-between py-4"}>
                    <h2 className={"text-white"}>FilmActu</h2>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}