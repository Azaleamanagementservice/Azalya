import React, { memo } from 'react'
import Navbar from '../Section/Navbar'
import Footer from '../Section/Footer'
import Contactsection from '../Section/Contactsection'
import Hero from '../Section/Hero';
import Mainlayout from '../Section/Mainlayout';


function Contact() {
  return (
    <Mainlayout>
     
      <Hero isHomepage={false} heading="Where Harmony Meets Housing" paragraph="  Creating well-managed communities and properties through trust, innovation, and expert real estate solutions." />
      <Contactsection shouldMapShow={true} />
     
    </Mainlayout>
  )
}

export default memo(Contact)
