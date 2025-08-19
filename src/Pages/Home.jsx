import React, { memo } from "react";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";

import Testimonial from "../Section/Testimonial";
import ContactImage from "../assets/Contact/Image1.jpg";
import AboutSection from "../Section/About";
import FAQSection from "../Section/FaqSection";
import CertificatesSection from "../Section/OurCertificate";
import Hero from "../Section/Hero";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Contactsection from "../Section/Contactsection";
import Servicesection from "../Section/Servicesection";
import Mainlayout from "../Section/Mainlayout";
import { HeadProvider, Link, Meta, Title } from "react-head";
const Home = () => {
  const nav = useNavigate();
  const NavigeToService = () => {
    nav("/services");
  };
  return (
    <>
      <HeadProvider>
        <Title>Azalea Services | Property & Society Management Experts</Title>
        <Meta
          name="description"
          content="Azalea Services offers NRI property management, developer post-sales support & cooperative housing society solutions with trust & transparency."
        />
      </HeadProvider>
      <Mainlayout>
        {/* hero */}
        <Hero
          isHomepage={true}
          heading="Where Harmony Meets Housing"
          paragraph="  Creating well-managed communities and properties through trust, innovation, and expert real estate solutions."
        />

        {/* About Us */}
        <AboutSection />

        {/* Services Section */}
        <Servicesection isServiceDisplay={true} />

        {/* Certificates Section */}
        <CertificatesSection />

        {/* Testimonials Section */}
        <Testimonial />
        {/* FAQ Section */}
        <FAQSection />
        {/* Contact Section */}
        <Contactsection shouldMapShow={false} />
      </Mainlayout>
    </>
  );
};

export default memo(Home);
