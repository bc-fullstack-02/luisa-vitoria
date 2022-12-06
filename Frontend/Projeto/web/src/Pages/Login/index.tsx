
import AuthForm from "../../Components/AuthForm"
import api from "../../services/api"

function Login() {

    async function handleLogin(user: string, password: string) {
        const data = await api.post('/security/login', {
            user,
            password
        })
        console.log(data)
    }


    return (
        <AuthForm 
            formTitle="Faça login e comece a usar!"
            submitFormButton="Entrar"
            linkDescription="Não possui conta? Crie uma agora!"
            submitFormButtonAction={handleLogin}
            routeName="/signup"
        />
    )
}

export default Login