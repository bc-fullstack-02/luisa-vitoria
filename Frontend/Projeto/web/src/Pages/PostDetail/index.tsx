import { useState, useEffect } from "react"
import { FormEvent } from 'react'
import { useParams } from "react-router-dom" 
import { Post } from "../../Model/Post"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import NavBar from "../../Components/NavBar"
import PostItem from "../../Components/PostItem"
import { likePost, unlikePost } from "../../services/posts"
import { PostInitModel } from "../../Model/PostInitModel"
import CommentItem from "../../Components/CommentItem"

interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
    readonly elements: CommentFormElements;
}

function PostDetail() {
    const profile = localStorage.getItem('profile') as string
    const { postId } = useParams()
    
    const [postDetail, setPostDetail] = useState<Post>(PostInitModel)
    const [newComment, setNewComment] = useState({})

    useEffect(() => {
        async function fetchPostDetail() {
            try {
                const response = await api.get(`/posts/${postId}`, getAuthHeader())

                setPostDetail(response.data)
            } catch(err) {
                console.error(err)
            }
        }

        fetchPostDetail()
    }, [])

    async function handleLike(postId: string) {
        try {
            if(postDetail?.likes.includes(profile)) {
                const newPost = await unlikePost(postDetail, profile)

                newPost && setPostDetail({...newPost})
            } else {
                const newPost = postDetail && (await likePost(postDetail, profile))

                newPost && setPostDetail({...newPost})
            }
        } catch(err) {
            console.error(err)
        }
        
    }

    async function handleSubmit(event: FormEvent<CommentFormElement>) {
        event.preventDefault()
        const form = event.currentTarget 

        const data = {
            description: form.elements.description.value
        }

        try {
            const response = await api.post(`/posts/${postId}/comments`, data , getAuthHeader())
            const comment = response.data

            setNewComment({...comment})
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="w-screen h-screen md:flex md:flex-row">
            <NavBar />

            <div className="basis-5/6 overflow-y-auto scrool-smooth">
                {postDetail && <PostItem post={postDetail} handleLike={handleLike} /> }

                <form action="" onSubmit={handleSubmit}>
                    <div className="border-lineBg border-b  px-5 bg-background flex flex-col items-center pb-2">
                        <input id='description' className="ml-2 py-2 text-textOnS text-md bg-background outline-none w-full text-center" placeholder="Adicione um comentário..."></input>
                        <div className="">
                            
                        </div>
                        <button className="bg-secondary w-full text-textOnP rounded-md">+</button>
                       
                        
                    </div>
                    
                </form>

                {postDetail._id !== '' && <CommentItem newComment={newComment} postId={postDetail._id} />}
            </div>
        </div>
    )
}

export default PostDetail