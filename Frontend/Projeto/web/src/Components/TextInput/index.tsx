import { InputHTMLAttributes, ReactNode } from "react"
import { Slot } from '@radix-ui/react-slot'

interface TextInputRootProps {
    children: ReactNode
}


function TextInputRoot(props: TextInputRootProps) {
    return (
        <div className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-neutral-800 focus-within:ring-2 ring-cyan-300 w-full">
            {props.children}
        </div>
    )
}

interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function TextInputInput(props: TextInputInputProps) {
    return (
        <input 
        className="bg-transparent flex-1 text-gray-100 text-sm placeholder:text-gray-500 outline-none" {...props}
        />
    )
}

interface TextInputIconProps {
    children: ReactNode
}

function TextInputIcon(props: TextInputIconProps) {
    return (
        <Slot className="h-6 w-6 text-gray-500">
            {props.children}
        </Slot>
    )
}

export const TextInput = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon
}