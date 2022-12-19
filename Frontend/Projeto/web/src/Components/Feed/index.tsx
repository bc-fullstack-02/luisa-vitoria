import { useState, useEffect } from "react"
import { UserCircle, ChatCentered, Heart } from "phosphor-react"
import api from "../../services/api"
import Heading from "../Heading"
import Text from "../Text"
import { getAuthHeader } from "../../services/auth"
import { Post } from "../../Model/Post"
import PostItem from "../PostItem"

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void
}

function Feed({posts, handleLike}: FeedProps) {
    const user = localStorage.getItem('user')
    const name = localStorage.getItem('name')
   
   

   console.log(posts)
    
    return (
        <div className="basis-5/6 overflow-y-auto scrool-smooth">
            <header className="px-5 py-3 border-b border-lineBg flex items-center ">
                <UserCircle size={40} weight='light' fill="" />
                <Heading size="xs" className="ml-2">{name}</Heading>
                <Heading  className="ml-2 text-sm">{`@${user}`}</Heading>
            </header>

            <main>
                {posts && 
                    posts.slice(0).reverse().map((post: Post) => (
                        
                       <PostItem post={post} handleLike={handleLike} />
                ))}
            </main>
            
        </div>
    )
}

export default Feed