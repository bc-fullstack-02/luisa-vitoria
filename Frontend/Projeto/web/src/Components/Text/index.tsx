import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { clsx } from 'clsx';

export interface TextProps{
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    children: ReactNode,
    asChild?: boolean,
    className?: string
}

function Text({size = 'md', children, asChild, className} : TextProps) {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp
        className={clsx(
            {
            "text-sm": size === 'sm',
            "text-base": size === 'md',
            "text-lg": size === 'lg',
            "text-xl": size === "xl",
            "text-2xl": size === "2xl"
            },
            className
        )}
        >
            {children}
        </Comp>
    )
}

export default Text