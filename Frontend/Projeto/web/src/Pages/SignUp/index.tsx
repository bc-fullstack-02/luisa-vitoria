import { useNavigate } from "react-router-dom"
import AuthForm, { Auth } from "../../Components/AuthForm"
import api from "../../services/api"

function SignUp() {
    const navigate = useNavigate()

    async function handleRegister(auth: Auth) {
        console.log(auth)
        try {
            await api.post('/security/register', auth)

            return navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <AuthForm 
            formTitle="Faça o cadastro e comece a usar!"
            submitFormButton="Cadastrar"
            linkDescription="Já possui conta? Entre agora!"
            submitFormButtonAction={handleRegister}
            routeName="/"
            showNameInput
        />
    )
}

export default SignUp