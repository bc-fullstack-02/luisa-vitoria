import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Heading from "../Heading";
import { UserCircle, UploadSimple } from "phosphor-react";
import Button from "../Button";
import { getAuthHeader } from "../../services/auth";
import Dropzone from "../Dropzone";
import Header from "../Header";


function Profile() {
    const navigate = useNavigate()
    const profileId = localStorage.getItem('profile')
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')
    const authHeader = getAuthHeader()

    const [profile, setProfile] = useState<{[key: string]: any}>({})

    const getProfile = async () => {
        try {
            const response = await api.get(`/profiles/${profileId}`, authHeader)
            setProfile(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    
    const handleClick = () => {
        hiddenFileInput.current && hiddenFileInput.current.click();
    };
    
    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.currentTarget as HTMLInputElement;
        const files = target.files;
        const fileUploaded = [].slice.call(files)[0]

        const data = new FormData()
        data.append('file', fileUploaded)

        try {
            const response = await api.patch(`/profiles/${profileId}`, data, authHeader)
            console.log(response)
            setProfile({...response.data})

        } catch(err) {
            console.error(err)
            alert('erro')
        }
    };

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="basis-5/6 overflow-y-auto scrool-smooth">
    
            <Header  profileImage={profile.image} profileUrlImage={profile.urlImage} />

            {Object.keys(profile).length !== 0 && (
                <div className="flex flex-col gap-3 items-center m-auto mt-10 px-5 py-5 w-1/3 rounded-2xl bg-primaryDark text-textOnP">
                 
                    {profile.image ? <img src={profile.urlImage} style={{width: '200px', height: '200px', borderRadius: '50%', verticalAlign:'middle'}} /> : <UserCircle size={48} />}

                    <button onClick={handleClick} className="px-2 py-1 bg-primary text-textOnP text-xs btn shadow-[0_2px_0_rgb(0,0,0)] hover:shadow-[0_1px_0px_rgb(0,0,0)]   ease-out hover:translate-y-1 hover:bg-primaryLight transition-all rounded-lg">
                        Clique para alterar imagem do perfil
                    </button>
        
                    <input
                        type="file"
                        accept="image/*"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{display: 'none'}} 
                    />
                    <Heading size="sm" className="ml-2 mt-2">{name}</Heading>

                    <div className="">
                        <Heading size="xs" className="ml-2 font-thin">{`user: ${user}`}</Heading>
                        <Heading size="xs" className="ml-2 font-thin">{`seguidores: ${profile.followers.length}`}</Heading>
                        <Heading size="xs" className="ml-2 font-thin">{`seguindo: ${profile.following.length}`}</Heading>
                    </div>

                    <div className="px-5 py-3">
                        <Button className="w-48 max-w-xs" onClick={handleLogout}>Sair</Button>
                    </div>
                </div>
            )}

        </div>
                

    )
}

export default Profile;