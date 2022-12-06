
import Heading from "../../Components/Heading"
import Text from "../../Components/Text"
import { TextInput } from "../../Components/TextInput"
import Button from "../../Components/Button"
import logo from '../../assets/parrot.svg'
import { User, Lock } from 'phosphor-react'

import { Link } from 'react-router-dom'
import { FormEvent } from "react"

interface AuthFormProps {
    formTitle: string,
    submitFormButton: string,
    linkDescription: string,
    submitFormButtonAction: (user: string, password: string) => {}
    routeName: string
}

function AuthForm({formTitle, submitFormButton, linkDescription, submitFormButtonAction ,routeName} : AuthFormProps) {

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const form = event.target as HTMLFormElement
        submitFormButtonAction(form.elements.user.value, form.elements.password.value)

    }

    return (
        <div className="text-cyan-50 flex flex-col items-center mt-16">
            <header className="flex flex-col items-center" >
                <img src={logo} alt="Parrot" />
                <Heading size="lg"> Sysmap Parrot </Heading>
                <Text size="md" className="mt-1 text-gray-500">{formTitle}</Text>
            </header>

            <form onSubmit={e => handleSubmit(e)} className="mt-10 flex flex-col gap-4 items-stretch w-full max-w-sm">
                <label htmlFor="user" className="flex flex-col gap-1">
                    <Text className="text-gray-100" size="md">Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon><User /></TextInput.Icon>
                        <TextInput.Input type="text" id="user" placeholder="Digite seu login"></TextInput.Input>
                    </TextInput.Root>
                </label>
                <label htmlFor="password" className="flex flex-col gap-1">
                    <Text className="text-gray-100" size="md">Senha</Text>
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