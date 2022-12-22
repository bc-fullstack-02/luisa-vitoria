import { useNavigate } from "react-router-dom"
import AuthForm, { Auth } from "../../Components/AuthForm"
import api from "../../services/api"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
    const navigate = useNavigate()

    async function handleRegister(auth: Auth) {
        try {
            const res = await toast.promise(api.post('/security/register', auth), {
                pending: "Carregando..."
            })

            if(res.status === 201) {
                console.log('ok')
                toast.success("Usuário criado com sucesso!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,

                });
            }

            return navigate("/")
        } catch(err) {
            console.log(err)
            toast.error("Ops! Ocorreu algum erro...", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,

            });
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