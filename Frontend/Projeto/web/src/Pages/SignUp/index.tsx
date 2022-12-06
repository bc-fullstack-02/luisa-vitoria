
import AuthForm from "../../Components/AuthForm"
import api from "../../services/api"

function SignUp() {

    async function handleRegister(user: string, password: string) {
        const data = await api.post('/security/register', {
            user,
            password
        })
        console.log(data)
    }

    return (
        <AuthForm 
            formTitle="Faça o cadastro e comece a usar!"
            submitFormButton="Cadastrar"
            linkDescription="Já possui conta? Entre agora!"
            submitFormButtonAction={handleRegister}
            routeName="/"
        />
    )
}

export default SignUp