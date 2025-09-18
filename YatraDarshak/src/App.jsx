import React from 'react'
import AuthPage from './Components/AuthCredentials/AuthPage';
import HeroSection from './Pages/HeroSection/HeroSection';
import OffersSection from './Pages/OffersSection/OffersSection';
import PartnerAdvantageSection from './Pages/PartnerAdvantageSection/PartnerAdvantageSection';
import JoinUsSection from './Pages/JoinUsSection/JoinUsSection';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <>
      {/* <AuthPage /> */}

      <div className="w-full">
        {/* Full-width Hero Section */}
        <div className="w-full">
          <HeroSection />
        </div>

        {/* Full-width Offers Section */}
        <div className="w-full">
          <OffersSection />
        </div>
        <div className="w-full">
          <PartnerAdvantageSection />
        </div>
        <div className="w-full">
          <JoinUsSection />
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
