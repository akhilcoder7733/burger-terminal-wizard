import React, { useEffect } from 'react'
import Home from './Home'
import Hero from './Hero'
import Dishes from './Dishes'
import Contact from './Contact'
import MainBox from './ImageSection'

function Start() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Home/>
      <Hero/>
      <Dishes/>
      <MainBox/>
      <Contact/>
    </>
  )
}

export default Start
