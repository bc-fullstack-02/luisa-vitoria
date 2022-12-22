import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import { likePost, unlikePost } from "../../services/posts";
import { useState, useEffect } from "react"
import Menu from '../../Components/Menu';
import Feed from '../../Components/Feed';
import { Post } from "../../Model/Post"


function Home() {
    const profile = localStorage.getItem('profile') as string
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
        const [post, ...rest] = posts.filter(post => post._id === postId)

        try {
            if(post && !post.likes.includes(profile)) {
                const newPost = await likePost(post, profile)
                changePostItem(newPost)
            } else {
                const newPost = await unlikePost(post, profile)
                changePostItem(newPost)
            }
            
        } catch(err) {
            console.error(err)
        }
    }

    function changePostItem(newPost: Post) {
        setPosts(posts => {
            const post = newPost
            const index = posts.indexOf(post)
            posts[index] = post
            return [...posts]
        })  
    }

    function newPostCreated(post: Post) {
        setPosts(posts => [...posts, post])
    }
   
    return (
        <div className="w-screen h-screen flex-col md:flex md:flex-row">
            <Menu newPostCreated={newPostCreated} />
            <Feed posts={posts} handleLike={handleLike} />
        </div>
    )
}

export default Home;

