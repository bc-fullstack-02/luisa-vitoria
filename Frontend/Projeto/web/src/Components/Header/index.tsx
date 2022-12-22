import Heading from "../Heading";
import { UserCircle } from "phosphor-react";

function Header(props: any) {
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')

    return (
        <header className=" bg-lineBg px-5 py-3 border-b border-lineBg md:flex items-center gap-2 sticky top-0 w-full hidden">
           
            {props.profileImage ?
                <img src={props.profileUrlImage} className='h-12 w-12 rounded-full' /> 
                :  
                <UserCircle size={48} weight='light' fill="" />
            }
            <div>
                <Heading size="xs" className="ml-2">{name}</Heading>
                <Heading size="xxs" className="ml-2 text-sm">{`@${user}`}</Heading>
            </div>
            
         
        </header>
    )
}

export default Header;