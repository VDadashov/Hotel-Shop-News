import React from 'react'
import { Helmet } from 'react-helmet'
import PageBanner from '../../../components/common/PageBanner'
import AboutContentSection from '../../../components/site/AboutUs/AboutContentSection'
const AboutUs = () => {
  return (
    <>
    <Helmet>
        <title>About Us</title>
    </Helmet>
    <PageBanner
        title="Haqqımızda"
        breadcrumb="Home  / Haqqımızda"
    />
    <AboutContentSection/>

    </>
  )
}

export default AboutUs