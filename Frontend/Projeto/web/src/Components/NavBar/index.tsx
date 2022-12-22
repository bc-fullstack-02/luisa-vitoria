import { HouseSimple, User, UsersThree } from "phosphor-react"
import logo_menu from "../../assets/parrot_menu.svg"
import Text from "../Text";
import MenuItem from "../MenuItem";
import { ReactNode } from "react";

interface NavBarProps {
    children?: ReactNode
}

function NavBar({children}: NavBarProps) {
    
    return (
        <div className="basis-1/6 pt-4 bg-primaryDark md:block flex justify-between ">
            <header className="items-center py-2 ml-8 md:flex hidden ">
                <img src={logo_menu}  alt="Logo Sysmap Parrot" />
                <Text size="2xl" className="font-extrabold ml-4 text-textOnP tracking-wider">Parrot</Text>
            </header> 

            <nav >
                <ul className="md:block flex flex-row justify-start">
                    <MenuItem route='/home' menuTitle="Home">
                        <HouseSimple size={32} weight="fill" />
                    </MenuItem>
                    <MenuItem route='/profile' menuTitle="Perfil">
                        <User size={32} weight="fill"/>
                    </MenuItem>
                    <MenuItem route='/friends' menuTitle="Amigos">
                        <UsersThree size={32} weight="fill"/>
                    </MenuItem>
                </ul> 
            </nav> 

            {children}
        </div>
    )

}

export default NavBar;