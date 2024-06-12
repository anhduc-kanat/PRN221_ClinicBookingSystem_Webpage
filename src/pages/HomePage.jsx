import React from "react";
// Sections
import Blog from "../components/Sections/Blog";
import Footer from "../components/Sections/Footer"
import Header from "../components/Sections/Header";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import TopNavbar from "src/components/Nav/TopNavbar";



export default function HomePage() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
      <Projects />
      <Blog />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}


