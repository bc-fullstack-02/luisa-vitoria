import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AuthForm, { Auth } from "../../Components/AuthForm"
import api from "../../services/api"

interface UserToken {
    profile: string
    user: string
}

function Login() {
    const navigate = useNavigate()

    async function handleLogin(auth: Auth) {
        try {
            const { data } = await api.post('/security/login', auth)

            const decodedToken = (jwt_decode(data.accessToken)) as UserToken
            localStorage.setItem('profile', decodedToken.profile._id)
            localStorage.setItem('name', decodedToken.profile.name)
            localStorage.setItem('user', decodedToken.user )
            localStorage.setItem('accessToken', data.accessToken )

            console.log(decodedToken)

            return navigate("/home")
        } catch(err) {
            console.error(err)
            alert('erro')
        }
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