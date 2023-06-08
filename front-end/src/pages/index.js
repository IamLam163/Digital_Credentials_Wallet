import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import InfoSection from '../components/InfoSection';
import HeroSection from '../components/HeroSection'
import { HomeObjOne, HomeObjTwo, HomeObjThree } from '../components/InfoSection/Data';
import Services from '../components/Services';
import Footer from '../components/Footer';
const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    //reverse the changes
    //side is  masking the navbar
    <>
    <Navbar/>
    {/*<Sidebar/>*/}
      <HeroSection />
      <InfoSection {...HomeObjOne} />
      <InfoSection {...HomeObjTwo} />
      <Services />
      <InfoSection {...HomeObjThree} />
      <Footer />
    </>
  )
}

export default Home;
