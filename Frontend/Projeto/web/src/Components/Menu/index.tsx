import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react';
import { HouseSimple, User, UsersThree } from "phosphor-react"
import MenuItem from "../MenuItem"
import Text from "../Text";
import logo_menu from "../../assets/parrot_menu.svg"
import CreatePostButton from '../../Components/CreatePostButton';
import CreatePostDialog from '../../Components/CreatePostDialog';
import { Post } from '../../Model/Post'

interface MenuProps {
    newPostCreated: (post: Post) => void;
}

function Menu(props: MenuProps) {
    const [open, setOpen] = useState(false)

    function postCreated(post: Post) {
        setOpen(false)
        props.newPostCreated(post)
    }

    return (
        <div className="basis-1/6 pt-4 bg-primaryDark">
            <header className="flex items-center py-2 ml-8 ">
                <img src={logo_menu}  alt="Logo Sysmap Parrot" />
                <Text size="2xl" className="font-extrabold ml-4 text-textOnP tracking-wider">Parrot</Text>
            </header> 

            <nav>
                <ul>
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

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <CreatePostButton />

                <CreatePostDialog postCreated={postCreated} />
            </Dialog.Root>
                
        </div>
    )
}

export default Menu;