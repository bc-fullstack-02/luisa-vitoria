import { useEffect, useState } from "react"
import Heading from "../../Components/Heading"
import Text from "../../Components/Text"
import { TextInput } from "../../Components/TextInput"
import Button from "../../Components/Button"
import logo from '../../assets/parrot.svg'
import { User, Lock } from 'phosphor-react'

import { Link } from 'react-router-dom'
import { FormEvent } from "react"

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    const [inputValues, setInputValue] = useState({
        user: "",
        password: ""
    });

    const [validation, setValidation] = useState({
        user: "",
        password: ""
    });

    const [formValid, setFormValid] = useState(false)
    const [userValid, setUserValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    function handleChange(event: any) {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const checkValidation = () => {
        let errors = validation;
        const regexUser = /[a-zA-Z0-9]{5,}/gm
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(regexUser.test(inputValues.user)) {
            errors.user = ''
            setUserValid(true)
        }else {
            errors.user = 'mínimo 5 caracteres entre letras e/ou números'
            setUserValid(false)
        }

        if(regexPassword.test(inputValues.password)) {
            errors.password = ''
            setPasswordValid(true)
        }else {
            errors.password = 'mínimo 8 caracteres - deve conter ao menos 1 letra e 1 número'
            setPasswordValid(false)
        }

        if(userValid && passwordValid) setFormValid(true)
        else setFormValid(false)
       
        setValidation({...errors})
    }

    useEffect(() => {
        checkValidation();
    }, [inputValues, userValid, passwordValid, formValid]);


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
        <div className="text-cyan-50 flex flex-col items-center mt-10">
            <header className="flex flex-col items-center" >
                <img src={logo} alt="Parrot" />
                <Heading size="lg"> Sysmap Parrot </Heading>
                <Text size="md" className="mt-1 text-gray-500">{formTitle}</Text>
            </header>

            <form onSubmit={handleSubmit} className=" mt-10 flex flex-col gap-3 items-stretch w-full max-w-sm">
                {showNameInput && (
                    <label htmlFor="name" className=" flex flex-col gap-1">
                        <Text size="md">Nome</Text>
                        <TextInput.Root>
                            <TextInput.Icon><User /></TextInput.Icon>
                            <TextInput.Input type="text" id="name" name="name" placeholder="Digite seu nome"></TextInput.Input>
                        </TextInput.Root>
                    </label>
                )}
                
                <label htmlFor="user" className=" flex flex-col gap-1">
                    <Text size="md">Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon><User /></TextInput.Icon>
                        <TextInput.Input value={inputValues.user} onChange={(event) => handleChange(event)} type="text" id="user" name="user" placeholder="Digite seu login" required></TextInput.Input>
                    </TextInput.Root>
                    
                    {showNameInput && validation.user !== "" && (
                        <p className="text-xs text-primaryDark">{validation.user}</p>
                    )}
                </label>
                <label htmlFor="password" className=" flex flex-col gap-1">
                    <Text size="md">Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon><Lock /></TextInput.Icon>
                        <TextInput.Input value={inputValues.password} onChange={(event) => handleChange(event)} type="password" id="password" name="password" placeholder="*******" required></TextInput.Input>
                    </TextInput.Root>
                    {showNameInput && validation.password !== "" && (
                        <p className="text-xs text-primaryDark">{validation.password}</p>
                    )}
                </label>
                <Button type="submit" disabled={!formValid}  className="mt-4">{submitFormButton}</Button>

            </form>

            <footer className=" flex flex-col items-center gap-4 mt-3">
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