
import React, { useContext } from 'react';
import { UserCircle, Heart, ChatCentered } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Context as PostContext} from '../../context/PostContext';
import { Context as AuthContext} from '../../context/AuthContext';
import { Post } from '../../@types/post';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface PostItemProps {
    post: Post;
    screenName?: string;
    navigation?: NativeStackNavigationProp<any, any>;
    handleLike: (postId: string) => void;
}

const PostItem = ({ post, screenName, navigation, handleLike}: PostItemProps) => {

    const { profile } = useContext(AuthContext)

    const newPostUrlImage = post.urlImage.replace('localhost', '192.168.0.12')
    const newProfileUrlImage = post.profile.urlImage.replace('localhost','192.168.0.12')
    

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                {post.profile.image ? <Image source={{uri: newProfileUrlImage}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' /> }
                
                <Text style={styles.userNameText}>{post.profile.name}</Text>
                <Text style={styles.userUserText}>{`@${post.profile.user.user}`}</Text>
            </View>
            

            {screenName && navigation ? 
            <TouchableOpacity onPress={() => navigation.navigate(screenName, {postId: post._id})}>
                <View style={styles.content}>
                    <Text style={styles.post_title}>{post.title}</Text>
                    {post.description !== '  ' && <Text style={styles.post_description}>{post.description}</Text>}
                    {post.image && (
                        <Image source={{uri: newPostUrlImage}}  style={styles.post_image} />  
                    )} 
                </View>
            </TouchableOpacity>
            :
                <View style={styles.content}>
                    <Text style={styles.post_title}>{post.title}</Text>
                    {post.description !== '  ' && <Text style={styles.post_description}>{post.description}</Text>}
                    {post.image && (
                        <Image source={{uri: newPostUrlImage}}  style={styles.post_image} />  
                    )} 
                </View>
            }
            
            <View style={styles.footer}>
                <View style={styles.footer_item}>
                    <TouchableOpacity onPress={() => handleLike(post._id)}>
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