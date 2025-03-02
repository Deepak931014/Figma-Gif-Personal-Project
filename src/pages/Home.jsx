import React, { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import AdSection from "../components/home/AdSection";
import Gallery from "../components/home/Gallery";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Categories />
            <AdSection />
            <Gallery searchTerm={searchTerm} />
        </>
    )
}
export default Home;