import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent } from 'react'
import api from '../../services/api'
import { TextInput } from '../TextInput'
import Button from '../Button'
import Dropzone from '../Dropzone'
import { Post } from '../../Model/Post'
import ImageUpload from '../ImageUpload'

interface CreatePostDialogProps {
    postCreated: (post: Post) => void
}

function CreatePostDialog({ postCreated }: CreatePostDialogProps) {

    const token = localStorage.getItem('accessToken')
    const [selectedFile, setSelectedFile] = useState<File>()



    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget 

        const data = new FormData()
        data.append('title', form.elements.title.value)
        data.append('description', form.elements.description.value )

        if(selectedFile) {
            data.append('file', selectedFile)
        }
       
        try {
            const response = await api.post('/posts', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            postCreated(response.data)

        } catch(err) {
            console.error(err)
            alert('erro')
        }
        
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-primary py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl font-black text-textOnP'>Novo Post</Dialog.Title>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>

                    <div className='flex flex-col gap-2'>
                        <label  htmlFor="title" className='font-semibold text-md text-textOnP'>
                            Título do Post
                        </label>
                        <TextInput.Input id='title' placeholder='Digite o título do seu post...' className='text-md text-gray-300 text-textOnP bg-transparent outline-none' />

                        <label  htmlFor="description" className='font-semibold text-md text-textOnP'>
                            O que você está pensando?
                        </label>
                        <TextInput.Input id='description' placeholder='Digite o que está pensando...' className='text-md text-gray-300 text-textOnP bg-transparent outline-none' />

                        <Dropzone  onFileUploaded={setSelectedFile} />
                    </div>

                    <footer className='mt-7 flex justify-end gap-4'>
                        <Button type="submit" className='text-textOnS font-semiboold flex-none w-48 h-12'>Postar</Button>

                        <Dialog.Close type='button' className='px-5 h-12 border hover:bg-close hover:border-none rounded-xl focus:ring-2 ring-close text-textOnP text-md font-semibold  '>Fechar</Dialog.Close>
                    </footer>
                </form>

            </Dialog.Content>

        </Dialog.Portal>
    )
}

export default CreatePostDialog