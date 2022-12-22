import * as Dialog from '@radix-ui/react-dialog'
import { PlusCircle } from 'phosphor-react'

function CreatePostButton() {

    return (
        <>
        <div className=' ml-4 mr-4 hidden sm:block'>
            <Dialog.Trigger className='py-2 px-4 md:mt-6 mb-2 mr-2 w-full  rounded-2xl font-semibold text-lg bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br'>
            Novo Post
            </Dialog.Trigger>
        </div>
        <div className='mr-5 mb-1 sm:hidden px-2 pt-1 hover:rounded-2xl hover:bg-hoverBg hover:text-textOnS'>
            <Dialog.Trigger>
                <PlusCircle className='text-textOnP hover:text-textOnS ' size={36} weight="regular" />
            </Dialog.Trigger>
        </div>
        </>
       
    )
}

export default CreatePostButton