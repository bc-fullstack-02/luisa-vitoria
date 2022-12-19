import * as Dialog from '@radix-ui/react-dialog'

function CreatePostButton() {

    return (
        <div className=' ml-4 mr-4'>
            <Dialog.Trigger className='py-2 px-4 mt-6 w-full  rounded-2xl font-semibold text-lg bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br'>
            Novo Post
        </Dialog.Trigger>
        </div>
       
    )
}

export default CreatePostButton