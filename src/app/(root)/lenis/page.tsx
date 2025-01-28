'use client';
import React, { useEffect } from 'react';
import Lenis from "@studio-freight/lenis";

const Page = () => {
    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Adjust duration for smoother or faster scrolling
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
        });

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
        <div className='relative'>
            {/* Header */}
            <h1 className="text-3xl font-bold text-center py-6">Smooth Scrolling with Overlapping Sections</h1>

            {/* Section 1 */}
            <div className="bg-green-200 h-[100vh] flex items-center justify-center">
                <p className="text-xl">Scroll down to see the second section.</p>
            </div>

            {/* Section 2 */}
            <div className="bg-green-400 h-[100vh] flex items-center justify-center">
                <p className="text-xl">Keep scrolling down to see the footer overlap this section.</p>
            </div>

            {/* Section 3 - Sticky Footer */}
            <div className="bg-red-800 h-[100vh] sticky top-0 z-20 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                    This is the sticky section
                </p>
            </div>

            {/* Section 4 - ffjhfjg The Third Section (Covering the Footerasidusd ) */}
            <div className="bg-blue-600 h-[100vh] relative w-full z-[50] flex items-center justify-center">
                <p className="text-white text-xl">the footer</p>
            </div>

        </div>
    );
};

export default Page;
