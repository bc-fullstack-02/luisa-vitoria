import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean,
    children: ReactNode,
    className?: string
}

function Button({asChild, children, className, ...props}: ButtonProps) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp 
        className={clsx(
            "py-2  bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br rounded-xl font-semibold text-black text-md w-full transition-colors  focus:ring-2 ring-secondary", className 
            )} 
            {...props}>
            {children}
        </Comp>
    )
    
}

export default Button;