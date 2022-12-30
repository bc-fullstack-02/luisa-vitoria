
import React, { useContext } from 'react';
import { UserCircle, Heart, ChatCentered } from 'phosphor-react-native'
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Context as PostContext} from '../../context/PostContext';
import { Context as AuthContext} from '../../context/AuthContext';
import { Post } from '../../@types/post';
import { styles } from './styles';


interface PostItemProps {
    post: Post;
}

const PostItem = ({ post }: PostItemProps) => {

    const { likePost, unlikePost } = useContext(PostContext)
    const { profile } = useContext(AuthContext)

    function handleLikePress() {
        if(profile && post.likes.includes(profile)) {
            unlikePost && unlikePost({ postId: post._id})
        } else {
            likePost && likePost({postId: post._id})
        }
    }

    const newPostUrlImage = post.urlImage.replace('localhost', '192.168.0.12')
    const newProfileUrlImage = post.profile.urlImage.replace('localhost','192.168.0.12')

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                {post.profile.image ? <Image source={{uri: newProfileUrlImage}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' /> }
                
                <Text style={styles.userNameText}>{post.profile.name}</Text>
                <Text style={styles.userUserText}>{`@${post.profile.user.user}`}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.post_title}>{post.title}</Text>

                {post.description !== '  ' && <Text style={styles.post_description}>{post.description}</Text>}
                

                {post.image && (
                    <Image source={{uri: newPostUrlImage}}  style={styles.post_image} />
                    
                )} 
            </View>
            <View style={styles.footer}>
                <View style={styles.footer_item}>
                    <TouchableOpacity onPress={handleLikePress}>
                        {profile && post.likes.includes(profile) ? 
                            <Heart size={28} color='#81d4fa' weight='fill' /> 
                            :  
                            <Heart size={28} />
                        }
                    </TouchableOpacity>
                    
                    <Text>{post.likes.length}</Text>
                </View>
                <View style={styles.footer_item}>
                    <ChatCentered size={28} />
                    <Text>{post.comments.length}</Text>
                </View>
                
            </View>
        </View>
    )
}

export default PostItem;