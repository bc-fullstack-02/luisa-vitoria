import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react';
import { HouseSimple, User, UsersThree } from "phosphor-react"
import MenuItem from "../MenuItem"
import Text from "../Text";
import logo_menu from "../../assets/parrot_menu.svg"
import CreatePostButton from '../../Components/CreatePostButton';
import CreatePostDialog from '../../Components/CreatePostDialog';
import NavBar from '../NavBar';
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
        <>
            <NavBar>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                <CreatePostButton />

                <CreatePostDialog postCreated={postCreated} />
                </Dialog.Root>
            </NavBar> 
        </>
    )
}

export default Menu;