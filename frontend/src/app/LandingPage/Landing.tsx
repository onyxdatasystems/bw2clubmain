import Home from './sections/page'
import WhoWeAre from './whoweare/page'
import FeaturesLayout from './features/page'
import AwardsSection from './awards/page'
import Partners from './partners/page'
import ActiveUsersCard from '@/app/LandingPage/active/page'
import StayTuned from './stay/page'
import Footer from './footer/page'
import Header from './Header'

const Landing = () => {
  return (
<>
<Header />
  <Home />
    <WhoWeAre/>
    <FeaturesLayout />
    <AwardsSection />
    <Partners />
    <ActiveUsersCard />
    <StayTuned />
    <Footer />
</>
  )
}

export default Landing