import React, { memo } from "react";
import Navbar from "../Section/Navbar";
import Footer from "../Section/Footer";
import Contactsection from "../Section/Contactsection";
import Hero from "../Section/Hero";
import Mainlayout from "../Section/Mainlayout";
import { HeadProvider, Link, Meta, Title } from "react-head";
function Contact() {
  return (
    <>
      <HeadProvider>
        <Title>Contact Azalea Services | Book a Free Consultation</Title>
        <Meta
          name="description"
          content="Connect with Azalea Services today for expert property, developer & society management solutions. Request your free consultation now."
        />
      </HeadProvider>

      <Mainlayout>
        <Hero
          isHomepage={false}
          heading="Where Harmony Meets Housing"
          paragraph="  Creating well-managed communities and properties through trust, innovation, and expert real estate solutions."
        />
        <Contactsection shouldMapShow={true} />
      </Mainlayout>
    </>
  );
}

export default memo(Contact);
