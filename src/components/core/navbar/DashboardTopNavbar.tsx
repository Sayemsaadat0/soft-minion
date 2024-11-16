'use client'
import { useRef, useState } from "react";
import DashboardAside from "../asidebar/DashboardAside";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidenavRef = useRef<HTMLDivElement>(null);

    const closeNav = () => {
        setIsOpen(false);
        document.removeEventListener('mousedown', handleClickOutside);
    };
    const openNav = () => {
        setIsOpen(true);
        document.addEventListener('mousedown', handleClickOutside);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (sidenavRef.current && !sidenavRef.current.contains(event.target as Node)) {
            closeNav();
        }
    };

    return (
        <div className="z-50">
            {isOpen && <div className="overlay bg-black/70" onClick={closeNav} />}
            <div className={`sidenav ${isOpen ? 'open' : ''}`} ref={sidenavRef}>
                <button className="closebtn" onClick={closeNav}>
                    &times;
                </button>
                <DashboardAside />
            </div>

            <button
                id="openDrawerButton"
                className="mt-2"
                style={{ cursor: 'pointer' }}
                onClick={openNav}
            >
                <MenuIcon />
            </button>
        </div>
    );
};

// Default Component
const DashboardTopNavbar = () => {
    const { back, forward } = useRouter();

    return (
        <div className="px-4 md:px-8 relative  py-3 md:py-6 z-50  flex items-center justify-between">
            <div className="block lg:hidden ">
                <Typography sx={{ fontWeight: 400 }} variant='h4'>
                    Soft Minion
                </Typography>
            </div>
            <div className="hidden lg:block">
                <div className="flex gap-4 items-center ">
                    <div className="flex gap-2">
                        <div
                            onClick={back}
                            className="p-2 border border-primary_color cursor-pointer hover:bg-primary_color/20 rounded-full"
                        >
                            <ArrowBackIcon className="text-primary_color" />
                        </div>
                        <div
                            className="p-2 border border-primary_color cursor-pointer hover:bg-primary_color/20 rounded-full"
                            onClick={forward}
                        >
                            <ArrowBackIcon className="rotate-180 text-primary_color" />
                        </div>
                    </div>
                    <div >
                        <Typography variant="h5">
                            Task List Dashboard
                        </Typography>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardTopNavbar;
