import { UserCircle, ChatCentered, Heart } from "phosphor-react"
import Heading from "../Heading"
import Text from "../Text"
import { Post } from "../../Model/Post"
import { Link } from "react-router-dom"

interface PostItemProps {
    post: Post;
    handleLike: (postId: string) => void;
}

function PostItem({post, handleLike}: PostItemProps) {
    const profile = localStorage.getItem('profile') as string
    
    return (
        <section className="px-6 py-4 border-b border-lineBg  flex flex-col gap-3 hover:bg-hoverBg">
            <header className="flex items-center">
                {post.profile.image ? 
                    <img src={post.profile.urlImage} className='h-12 w-12 rounded-full' /> 
                    :  
                    <UserCircle size={48} weight='light' fill="" />
                }
                <div>
                    <Heading size="xs" className="ml-2">{post.profile.name}</Heading>
                    <Heading size="xxs" className="ml-2 text-sm">{`@${post.profile.user.user}`}</Heading>
                </div>
                
            </header>

            <Link to={`/posts/${post._id}`}>
                <div className="flex flex-col gap-2">
                    <Text asChild size="md" className="">
                        <p>{post.title}</p>
                    </Text>

                    <Text asChild size="sm" className="">
                            <p>{post.description}</p>
                    </Text>
                </div>
                

                {post.image && (
                    <img src={post.urlImage} alt="Foto" className="max-w-xs sm:max-w-sm rounded-lg mt-3" />
                    
                )} 
            </Link>
            

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <div onClick={() => handleLike(post._id)}>
                        {post.likes.includes(profile) ? 
                            <Heart size={28} weight="fill" className="hover:text-secondary text-secondary cursor-pointer hover:scale-150 ease-in " /> 
                            :
                            <Heart size={28}  className="hover:text-secondary  cursor-pointer hover:scale-150 ease-in " />
                        }
                        
                    </div>
                    <Text>{post.likes.length}</Text>
                </div>

                <div className="flex items-center gap-1">
                    <Link to={`/posts/${post._id}`}>
                        <ChatCentered size={28} className="hover:text-secondary cursor-pointer hover:scale-150 ease-in" />
                    </Link>
                    <Text>{post.comments.length}</Text>
                    
                </div>
            </div>
            
        </section>
    )
}

export default PostItem;