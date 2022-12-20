import { UserCircle, ChatCentered, Heart } from "phosphor-react"
import Heading from "../Heading"
import Text from "../Text"
import { Post } from "../../Model/Post"

interface PostItemProps {
    post: Post;
    handleLike: (postId: string) => void;

}

function PostItem({post, handleLike}: PostItemProps) {
    const profile = localStorage.getItem('profile')
    console.log(post)
    
    return (
        <section className="px-5 py-3 border-b border-lineBg  flex flex-col gap-2 hover:bg-hoverBg">
            <header className="flex items-center">
                {post.profile.image ? <img src={post.profile.urlImage} className='h-12 w-12 rounded-full' /> :  <UserCircle size={48} weight='light' fill="" />}
                <Heading size="xs" className="ml-2">{post.profile.name}</Heading>
                <Heading  className="ml-2 text-sm">{`@${post.profile.user.user}`}</Heading>
            </header>

            <Text asChild size="md" className="pl-2">
                <p>{post.title}</p>
            </Text>

            <Text asChild size="sm" className="pl-2">
                    <p>{post.description}</p>
                </Text>

            {post.image && (
                <img src={post.urlImage} alt="Foto" className="max-w-xs rounded-lg ml-2" />
                
            )} 

            <div className="flex items-center gap-6 pl-2">
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
                    <ChatCentered size={28} className="hover:text-secondary cursor-pointer hover:scale-150 ease-in" />
                    <Text>{post.comments.length}</Text>
                </div>
            </div>
        </section>
    )
}

export default PostItem;