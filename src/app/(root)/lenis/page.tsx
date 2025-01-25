'use client'
import React, { useEffect } from 'react'
import Lenis from "@studio-freight/lenis";

const page = () => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2, // Adjust duration for smoother or faster scrolling
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            // direction: "vertical", // Set 'vertical' or 'horizontal'
            // smooth: true, // Enable smooth scrolling
        });

        // Request animation frame for Lenis
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);
    return (
        <div>
        <h1 className="text-3xl font-bold">Lenis Smooth Scroll in React</h1>
        <div className='bg-green-200' style={{ height: "200vh", padding: "20px" }}>
          <p>Scroll down to see the smooth scrolling effect.</p>
        </div>
        <div className='bg-green-400' style={{ height: "200vh", padding: "20px" }}>
          <p>Scroll down to see the smooth scrolling effect.</p>
        </div>
        <div className='bg-green-800' style={{ height: "200vh", padding: "20px" }}>
          <p>Scroll down to see the smooth scrolling effect.</p>
        </div>
      </div>
    )
}

export default page