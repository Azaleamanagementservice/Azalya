import React, { memo } from "react";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";
import Servicesection from "../Section/Servicesection";
import FAQSection from "../Section/FaqSection";
import Hero from "../Section/Hero";
import Mainlayout from "../Section/Mainlayout";

const Services = () => {
  return (
    <Mainlayout>
      <Hero
        isHomepage={false}
        heading="Where Harmony Meets Housing"
        paragraph="  Creating well-managed communities and properties through trust, innovation, and expert real estate solutions."
      />

      <Servicesection isServiceNavigation={true} />
      <FAQSection />
    </Mainlayout>
  );
};

export default memo(Services);
