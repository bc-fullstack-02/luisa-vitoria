import { ReactComponentElement, ReactElement, useCallback, useState } from 'react'
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

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
        }
    })

    return (
        <div className='flex flex-col' {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ? 
                <img src={selectedFileUrl} className='max-h-80' alt="Foto" />
                :
                <div className='flex items-center mt-2'>
                    <Image size={40} className="text-textOnP" />
                    <p className='text-textOnP'>adicione uma imagem!</p>
                </div>
            }
                      
        </div>
    )
}

export default Dropzone;