
import Heading from "../../Components/Heading"
import Text from "../../Components/Text"
import { TextInput } from "../../Components/TextInput"
import Button from "../../Components/Button"
import logo from '../../assets/parrot.svg'
import { User, Lock } from 'phosphor-react'

import { Link } from 'react-router-dom'
import { FormEvent } from "react"

interface AuthFormProps {
    formTitle: string;
    submitFormButton: string;
    linkDescription: string;
    submitFormButtonAction: (auth: Auth) => {};
    routeName: string;
    showNameInput?: boolean;
}

interface AuthFormElements extends HTMLFormControlsCollection {
    name?: HTMLInputElement;
    user: HTMLInputElement;
    password: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
    readonly elements: AuthFormElements;
}

export interface Auth {
    name?: string;
    user: string;
    password: string;
}

function AuthForm({formTitle, submitFormButton, linkDescription, submitFormButtonAction , routeName, showNameInput} : AuthFormProps) {

    function handleSubmit(event: FormEvent<AuthFormElement>) {
        event.preventDefault()
        const form = event.currentTarget

        
        
        const auth = {
            name: form.elements.name?.value,
            user: form.elements.user.value,
            password: form.elements.password.value
        }

        submitFormButtonAction(auth)
    }

    return (
        <div className="text-cyan-50 flex flex-col items-center mt-16">
            <header className="flex flex-col items-center" >
                <img src={logo} alt="Parrot" />
                <Heading size="lg"> Sysmap Parrot </Heading>
                <Text size="md" className="mt-1 text-gray-500">{formTitle}</Text>
            </header>

            <form onSubmit={handleSubmit} className=" mt-10 flex flex-col gap-4 items-stretch w-full max-w-sm">
                {showNameInput && (
                    <label htmlFor="name" className=" flex flex-col gap-1">
                        <Text size="md">Nome</Text>
                        <TextInput.Root>
                            <TextInput.Icon><User /></TextInput.Icon>
                            <TextInput.Input type="text" id="name" placeholder="Digite seu nome"></TextInput.Input>
                        </TextInput.Root>
                    </label>
                )}
                
                <label htmlFor="user" className=" flex flex-col gap-1">
                    <Text size="md">Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon><User /></TextInput.Icon>
                        <TextInput.Input type="text" id="user" placeholder="Digite seu login"></TextInput.Input>
                    </TextInput.Root>
                </label>
                <label htmlFor="password" className=" flex flex-col gap-1">
                    <Text size="md">Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon><Lock /></TextInput.Icon>
                        <TextInput.Input type="password" id="password" placeholder="*******"></TextInput.Input>
                    </TextInput.Root>
                </label>
                <Button type="submit" className="mt-4">{submitFormButton}</Button>

            </form>

            <footer className=" flex flex-col items-center gap-4 mt-8">
                <Text asChild size="sm">
                    <Link className=" text-gray-500 underline hover:text-gray-200"
                        to={routeName} 
                    >
                        {linkDescription}
                    </Link>
                </Text>
            </footer>
        </div>
       
    )
}

export default AuthForm