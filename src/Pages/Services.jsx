import React, { memo } from "react";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";
import Servicesection from "../Section/Servicesection";
import FAQSection from "../Section/FaqSection";
import Hero from "../Section/Hero";
import Mainlayout from "../Section/Mainlayout";
import { HeadProvider, Link, Meta, Title } from "react-head";
const Services = () => {
  return (<>
       <HeadProvider>
        <Title>Our Services | NRI Property, Developers & Society Management</Title>
        <Meta
          name="description"
          content="Explore Azalea Services: NRI property inventory management, developer post-sales support & cooperative housing society solutions."
        />
        <Link rel="canonical" href="https://www.azaleaservices.co.in/services" />
        <Meta name="robots" content="index,follow" />
        <Meta
          name="keywords"
          content="Azalea services list, NRI property inventory, developer post-sales services, society management services"
        />
        <Meta
          name="publisher"
          content="Azalea Management Services LLP"
        />
      </HeadProvider>
  
    <Mainlayout>
      <Hero
        isHomepage={false}
        heading="Where Harmony Meets Housing"
        paragraph="  Creating well-managed communities and properties through trust, innovation, and expert real estate solutions."
      />

      <Servicesection isServiceNavigation={true} />
      <FAQSection />
    </Mainlayout>
  </>
  );
};

export default memo(Services);
