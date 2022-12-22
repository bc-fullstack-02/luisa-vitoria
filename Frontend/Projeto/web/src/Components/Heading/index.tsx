import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { clsx } from 'clsx';

export interface HeadingProps{
    size?: 'xxs'| 'xs' | 'sm' | 'md' | 'lg',
    children: ReactNode,
    asChild?: boolean,
    className?: string
}

function Heading({size = 'md', children, asChild, className} : HeadingProps) {
    const Comp = asChild ? Slot : 'h2'

    return (
        <Comp
        className={clsx(
            "font-sans font-bold", 
            {
            "text-sm": size === 'xxs',
            "text-lg": size === 'xs',
            "text-xl": size === 'sm',
            "text-2xl": size === 'md',
            "text-3xl": size === 'lg'
            },
            className
        )}
        >
            {children}
        </Comp>
    )
}

export default Heading;