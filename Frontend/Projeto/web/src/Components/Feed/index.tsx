import { useState, useEffect } from "react"
import { UserCircle, ChatCentered, Heart } from "phosphor-react"
import api from "../../services/api"
import Heading from "../Heading"
import Text from "../Text"
import { getAuthHeader } from "../../services/auth"
import { Post } from "../../Model/Post"
import PostItem from "../PostItem"
import Header from "../Header"

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void
}

function Feed({posts, handleLike}: FeedProps) {
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')
    const profileId = localStorage.getItem('profile')
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

    
    return (
        <div className="basis-5/6 overflow-y-auto scrool-smooth">
            <Header profileImage={profile.image} profileUrlImage={profile.urlImage} />

            <main>
                {posts && 
                    posts.slice(0).reverse().map((post: Post) => (
                        
                       <PostItem key={post._id} post={post} handleLike={handleLike} />
                ))}
            </main>
            
        </div>
    )
}

export default Feed