import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-3 pe-4 ps-3 mx-2 rounded-r-xl ${
                active
                    ? 'border-white bg-white/30 text-white font-bold shadow-lg backdrop-blur-sm'
                    : 'border-transparent text-white/90 hover:border-white/50 hover:bg-white/20 hover:text-white font-medium'
            } text-base transition-all duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
