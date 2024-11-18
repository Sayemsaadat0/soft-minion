
import DashboardAside from '@/components/core/asidebar/DashboardAside';
import DashboardTopNavbar from '@/components/core/navbar/DashboardTopNavbar';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex">
                <NextTopLoader color="#6ebbb7" showSpinner={false} />
                <div >
                    <div className="fixed left-0 overflow-hidden  hidden bg-secondary_color lg:block  max-h-screen min-h-screen   w-[280px] border overflow-y-auto z-20">
                        <DashboardAside />
                    </div>
                </div>
                <div className="sticky top-0 z-50  w-full lg:ml-[280px]">
                    <div className="border-b ">
                        <DashboardTopNavbar />
                    </div>
                    <div className='px-4 md:px-8 py-3 md:py-6'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default template;
