import { useState, useEffect } from "react";
import api from "../../services/api";
import { UserCircle, Heart } from "phosphor-react"
import Heading from "../Heading"
import { getAuthHeader } from "../../services/auth";
import { Comment } from "../../Model/Comment";
import { CommentInitModel } from "../../Model/CommentInitModel";
import Text from "../Text";
import { likePost, unlikePost } from "../../services/posts";

interface CommentItemProps {
    postId: string;
    newComment?: {}
    // handleLike: (postId: string) => void;
}

function CommentItem({postId, newComment}: CommentItemProps) {
    const profile = localStorage.getItem('profile') as string

    const [comments, setComments] = useState<Comment[]>(CommentInitModel)

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await api.get(`/posts/${postId}/comments`, getAuthHeader())

                setComments(response.data)
            } catch(err) {
                console.error(err)
            }
        }

        fetchComments()
    }, [newComment])

       async function handleLike(commentId: string) {
        const [comment, ...rest] = comments.filter(comment => comment._id === commentId)

        try {
            if(comment && !comment.likes.includes(profile)) {
                await api.post(`/posts/${postId}/comments/${commentId}/like`, null, getAuthHeader())

                comment.likes.push(profile)
                changeCommentItem(comment)
            } else {
                await api.post(`/posts/${postId}/comments/${commentId}/unlike`, null, getAuthHeader())
                
                const index = comment.likes.indexOf(profile)
                comment.likes.splice(index, 1)
                changeCommentItem(comment)
            }
            
        } catch(err) {
            console.error(err)
        }
    }

    function changeCommentItem(newComment: Comment) {
        setComments(comments => {
            const comment = newComment
            const index = comments.indexOf(comment)
            comments[index] = comment
            return [...comments]
        })  
    }

    return (
        <div>
        {comments && (
            comments.slice(0).reverse().map((comment: Comment) => (

                <section key={comment._id} className="px-6 py-3 border-b border-lineBg  flex flex-col gap-3 hover:bg-hoverBg">
                    <header className="flex items-center">
                        {comment.profile.image ? 
                            <img src={comment.profile.urlImage} className='h-12 w-12 rounded-full' /> 
                            :  
                            <UserCircle size={48} weight='light' fill="" />
                        }
                        <div>
                            <Heading size="xs" className="ml-2">{comment.profile.name}</Heading>
                            <Heading  className="ml-2 text-sm">{`@${comment.profile.user.user}`}</Heading>
                        </div>
                    </header>

                    <Text asChild size="md" className="">
                        <p>{comment.description}</p>
                    </Text>

                    <div className="flex items-center gap-1">
                        <div onClick={() => handleLike(comment._id)}>
                            {comment.likes.includes(profile) ? 
                                <Heart size={28} weight="fill" className="hover:text-secondary text-secondary cursor-pointer hover:scale-150 ease-in " /> 
                                :
                                <Heart size={28}  className="hover:text-secondary  cursor-pointer hover:scale-150 ease-in " />
                            }
                        </div>
                        <Text>{comment.likes.length}</Text>
                    </div>
                </section>
        
            )))
        }
        </div>
    )
}


export default CommentItem