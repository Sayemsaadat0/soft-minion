'use client';
import { FC } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import GridViewIcon from '@mui/icons-material/GridView';
import { Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';


interface MenuItem {
    path: string;
    label: string;
    icon: JSX.Element;
}

const DashboardAside: FC = () => {
    const pathname = usePathname();

    // Simplified menu items without subRoutes
    const menuItems: MenuItem[] = [
        {
            path: "/",
            label: "Overview",
            icon: <GridViewIcon />,
        },
        {
            path: "/task-list",
            label: "Task List",
            icon: <ListAltIcon />,
        },
    ];

    return (
        <div className="p-5  max-w-[280px] bg-secondary_color min-h-[calc(100vh)] md:min-h-full overflow-hidden flex flex-col justify-between">
            <div className="space-y-20">
                <div className="flex items-center gap-3">
                    <Typography sx={{ fontWeight: 600 }} variant='h4'>
                        Soft Minion
                    </Typography>
                </div>
                <div className="">
                    <div className="space-y-3">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className={`flex gap-2 items-center w-full py-2 transition-all px-2 rounded-[6px] ${pathname === item?.path ? "bg-white" : "hover:bg-white"}`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAside;
