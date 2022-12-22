import { useState, useEffect } from "react";
import api from "../../services/api";
import { UserCircle, UsersFour } from "phosphor-react";
import Heading from "../Heading";
import Button from "../Button";
import { getAuthHeader } from "../../services/auth";

interface Profile {
    _id: string;
    name: string;
    followers: string[];
    followButtonDisabled: boolean;
    user: {
        user: string
    }
    image: boolean;
    urlImage: string;
}

function Profiles() {
    const profileUserId = localStorage.getItem('profile') as string
    const authHeader = getAuthHeader()

    const [profiles, setProfiles] = useState<Profile[]>([])

    const getProfiles = async () => {
        try {
            const response = await api.get('/profiles', authHeader)
            setProfiles(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProfiles()
    }, [])


    async function handleFollow(profileId: string) {
        try {
            await api.post(`/profiles/${profileId}/follow`, null, authHeader)

            setProfiles((profiles) => {
                const newProfiles = profiles.map((profile) => {
                    if(profile._id === profileId){
                        profile.followers.includes(profileUserId) ? '' : profile.followers.push(profileUserId) 
                    }
                    return profile
                })
                return [...newProfiles]
            })
        } catch(err) {
            console.error(err)
        }
    }

    async function handleUnfollow(profileId: string) {
        try {
            await api.post(`/profiles/${profileId}/unfollow`, null, authHeader)

            setProfiles((profiles) => {
                const newProfiles = profiles.map((profile) => {
                    if(profile._id === profileId){
                        const index = profile.followers.indexOf(profileUserId)
                        profile.followers.splice(index, 1)
                    }
                    return profile
                })
                return [...newProfiles]
            })
        } catch(err) {
            console.error(err)
        }
    }


    return (
        <div className="basis-5/6 overflow-y-auto scrool-smooth">
            <header className="px-5 py-3 border-b border-lineBg flex items-center ">
                <UsersFour size={32} weight='light' fill=""  />
                <Heading size="xs" className="ml-2">Amigos</Heading>
            </header>
            {profiles.slice(0).reverse().map(profile => (
                <section className=" flex flex-col gap-2 px-5 py-3 border-b border-lineBg hover:bg-hoverBg" key={profile._id}>
                    <header className="flex items-center mr-2">
                        {profile.image ? 
                            <img src={profile.urlImage} className='h-12 w-12 rounded-full' /> 
                            :  
                            <UserCircle size={48} weight='light' fill="" />
                        }
                        <Heading size="xs" className="ml-2">{profile.name}</Heading>
                        {profile.user && (
                            <Heading size="xxs" className="ml-2 text-sm">{`@${profile.user.user}`}</Heading>
                        )}
                        
                    </header>
                    <div>
                        
                        {profile.followers.includes(profileUserId) ? 
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleFollow(profile._id)} className="w-40  bg-lineBg py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary hover:opacity-80" disabled >
                                    Seguir
                                </button>

                                <button onClick={() => handleUnfollow(profile._id)} className="w-40  border-secondary bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary">
                                    Deixar de seguir
                                </button>
                            </div>
                        : 
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleFollow(profile._id)} className="w-40  border-secondary bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary">
                                    Seguir
                                </button>

                                <button onClick={() => handleUnfollow(profile._id)} className="w-40  bg-lineBg py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary hover:opacity-80" disabled >
                                    Deixar de seguir
                                </button>
                                
                            </div>
                        }
                       
                    </div>
                    
                    
                </section>
                
            ))}
        </div>
    )
}

export default Profiles;