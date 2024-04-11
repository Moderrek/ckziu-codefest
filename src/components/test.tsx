import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'

// Little helpers ...
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function TestApp() {
  const parallax = useRef<IParallax>(null!)
  // return <Parallax ref={parallax} pages={1} children={}></Parallax>;
  return <></>;
}
