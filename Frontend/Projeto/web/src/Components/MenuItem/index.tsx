import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Slot } from "@radix-ui/react-slot"
import Text from "../Text"

interface MenuItemProps {
    menuTitle: string;
    children?: ReactNode;
    route: string;
}

function MenuItem(props: MenuItemProps) {
    return (
        <li className="md:mt-5 md:ml-4 md:mr-4" >
            <Link to={props.route}>
                <div className="flex items-center px-3 md:px-4 rounded-2xl group hover:bg-background  py-1 cursor-pointer">
                    <Slot className=" fill-textOnP group-hover:fill-textOnS">{props.children}</Slot>
                    
                    <Text size="lg" className="font-semibold text-textOnP  group-hover:text-textOnS ml-4 md:block hidden">{props.menuTitle}</Text>
                </div>
            </Link>
        </li>
    )
}

export default MenuItem