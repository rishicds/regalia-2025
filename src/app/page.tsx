import EventSection from '@/components/Events/EventSection';
import Sponsors from '@/components/Sponsors/Sponsors';
import Music from '@/components/Music/Music';
import Hero from '@/components/Hero/Hero';


export default function Home() {
  return (
  <>
   <Hero/>
   <Music/>
   <EventSection/>
   <Sponsors/>
  </>
  )
}