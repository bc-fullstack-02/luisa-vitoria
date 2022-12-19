import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { Image } from 'phosphor-react';

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState("")

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className='flex flex-col' {...getRootProps()}>
                <input {...getInputProps()} />

                {selectedFileUrl ? 
                    <img src={selectedFileUrl} alt="Foto" />
                    :
                    <div className='flex items-center mt-2'>
                        <Image size={48} weight='thin' className='text-textOnP cursor-pointer' />
                        <p className='text-textOnP'>adicione uma foto!</p>
                    </div>
                    
                }
                          
        </div>
    )
}

export default Dropzone;