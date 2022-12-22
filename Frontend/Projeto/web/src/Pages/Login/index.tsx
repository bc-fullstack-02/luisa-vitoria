import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AuthForm, { Auth } from "../../Components/AuthForm"
import api from "../../services/api"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UserToken {
    profile: {
        _id: string;
        name: string;
    };
    user: string;
}

function Login() {
    const navigate = useNavigate()

    async function handleLogin(auth: Auth) {
        try {
            const res = await toast.promise(api.post('/security/login', auth), {
                pending: 'Carregando...',
            })

            if(res.status === 200) {
                toast.success("Usuário logado com sucesso!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }

            const decodedToken = (jwt_decode(res.data.accessToken)) as UserToken
            localStorage.setItem('profile', decodedToken.profile._id)
            localStorage.setItem('name', decodedToken.profile.name)
            localStorage.setItem('user', decodedToken.user )
            localStorage.setItem('accessToken', res.data.accessToken )

            return navigate("/home")
        } catch(err) {
            console.error(err)
            toast.error("Dados inválidos", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    }

    return (
        <>
        <AuthForm 
            formTitle="Faça login e comece a usar!"
            submitFormButton="Entrar"
            linkDescription="Não possui conta? Crie uma agora!"
            submitFormButtonAction={handleLogin}
            routeName="/signup"
        />
        <ToastContainer />
        </>
    )
}

export default Login