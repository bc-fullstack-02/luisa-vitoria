import { useNavigate } from "react-router-dom";
import Heading from "../Heading";
import { UserCircle } from "phosphor-react";
import Button from "../Button";

function Profile() {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="basis-5/6">
            <header className="px-5 py-3 border-b border-lineBg flex items-center ">
                <UserCircle size={40} weight='light' fill="" />
                <Heading size="xs" className="ml-2">{name}</Heading>
                <Heading  className="ml-2 text-sm">{`@${user}`}</Heading>
            </header>

            <div className="px-5 py-3">
                <Button className=" max-w-xs" onClick={handleLogout}>Sair</Button>
            </div>
        </div>
       


    )
}

export default Profile;