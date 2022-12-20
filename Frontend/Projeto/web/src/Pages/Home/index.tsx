import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import { useState, useEffect } from "react"
import Menu from '../../Components/Menu';
import Feed from '../../Components/Feed';
import { Post } from "../../Model/Post"

function Home() {
    const profile = localStorage.getItem('profile')
    const authHeader = getAuthHeader()

    const [posts, setPosts] = useState<Post[]>([])

    async function getPosts() {
        const response = await api.get('/feed', authHeader)
        setPosts(response.data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    async function handleLike(postId: string) {
        try {
            await api.post(`/posts/${postId}/like`, null, authHeader)
            const newPost = posts.filter(post => post._id === postId).map(post => {
                post.likes.push(profile)
                return post
            })

            setPosts(posts => {
                const post = newPost[0]
                const index = posts.indexOf(post)
                posts[index] = post
                return [...posts]
            })
           
        } catch(err) {
            console.error(err)
        }
    }

    function newPostCreated(post: Post) {
        setPosts(posts => [...posts, post])
    }
   
    return (
        <div className="w-screen h-screen flex">
            <Menu newPostCreated={newPostCreated} />
            <Feed posts={posts} handleLike={handleLike} />
        </div>
    )
}

export default Home;

