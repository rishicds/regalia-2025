import Hero from '@/components/Hero/Hero';
import Sponsors from '@/components/Sponsors/Sponsors';
import MusicSheet from '@/components/Music/MusicSheet';
import React from 'react'
import Music from '@/components/Music/Music';

const page = () => {
  return (
    <main className="relative">
      <Music/>
      <Sponsors/>
    </main>
  )
}

export default page;