"use client";

import React from "react";
import "./index.css";
import "flatpickr/dist/flatpickr.min.css";
import Gallery from "@/app/gallery";
import VideoSection from "@/app/VideoSection";
import Footer from "@/app/footer";
import Visit from "@/app/visit";
import AboutUs from "@/app/aboutUs";
import Header from "@/app/header";
import MenuList from "@/app/menu-book";

const MonkeyBar: React.FC = () => {
    return (
        <>
            <Header/>
            {/* 🎥 HERO — now using shared VideoSection */}
            <VideoSection src="monkey.mp4" height="100vh" >
                <div className="content">
                    <div className="kicker">Cocktails · Beats · Kleinstadtdschungel</div>
                    <h1 className="title">
                        Willkommen in der <span className="accent">Monkey Bar</span>
                    </h1>
                    <p className="subtitle">
                        Signature-Drinks, ausgewählte Spirituosen und feine Bar-Snacks – mitten im urbanen Dschungel.
                        Lehn dich zurück, genieße die Musik und lass den Abend laufen.
                    </p>
                    <div className="cta">
                        <a className="btn-primary bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold px-4 py-2 rounded-full" href="#menu-list">
                            <i className="fa-solid fa-martini-glass-citrus"/> Unsere Drinks
                        </a>
                        <a className="btn-primary bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold px-4 py-2 rounded-full" href="#visit">
                            <i className="fa-solid fa-location-dot"/> Anfahrt
                        </a>
                    </div>
                </div>
            </VideoSection>
            <AboutUs/>
            {/* 💬 QUOTE SECTION */}
            <VideoSection src="monkey3.mp4">
                <p className="quote">
                    „Es braucht nicht viel, um einen guten Abend zu haben – nur gute Menschen,
                    gute Musik und einen richtig guten Drink.“
                </p>
            </VideoSection>
            {/* 🍹 HAPPY HOUR SECTION */}
          {/*  <VideoSection src="monkey.mp4">
                <p className="quote">
                    Happy Hour täglich 17–19 Uhr · 2 für 1 auf ausgewählte Drinks
                </p>
            </VideoSection>*/}
            <Gallery/>
            <MenuList/>
            <Visit/>
            <Footer/>
        </>
    );
};

export default MonkeyBar;
