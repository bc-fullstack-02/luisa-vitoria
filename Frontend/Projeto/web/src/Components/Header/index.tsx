import Heading from "../Heading";
import { UserCircle } from "phosphor-react";

function Header(props: any) {
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')

    return (
        <header className="px-5 py-3 border-b border-lineBg flex items-center ">
           
            {props.profileImage ? <img src={props.profileUrlImage} className='h-12 w-12 rounded-full' /> :  <UserCircle size={48} weight='light' fill="" />}
            <Heading size="xs" className="ml-2">{name}</Heading>
            <Heading  className="ml-2 text-sm">{`@${user}`}</Heading>
         
        </header>
    )
}

export default Header;