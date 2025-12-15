import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl transition-all duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-white/30 text-white border-2 border-white/50 shadow-lg backdrop-blur-sm'
                    : 'text-white/90 hover:bg-white/20 hover:text-white border-2 border-transparent hover:border-white/30') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
