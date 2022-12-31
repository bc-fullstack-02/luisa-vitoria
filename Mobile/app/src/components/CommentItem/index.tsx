
import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, } from 'react-native';
import {UserCircle, ChatCentered, Heart } from 'phosphor-react-native'
import api from '../../services/api';
import { styles } from './styles';
import { Context as AuthContext} from '../../context/AuthContext';
import { getAuthHeader } from '../../services/auth';
import { Comment } from '../../@types/comment';


interface CommentItemProps {
    postId: string;
    newComment?: {}
}

const CommentInitModel = [{
    _id: '',
    description: '',
    profile: {
        name: '',
        user: {
            user: '',
        },
        image: false,
        urlImage: '',
    },
    likes: [''],
    likedByUser: false,
}]

const CommentItem = ({ postId, newComment}: CommentItemProps) => {
    const { profile } = useContext(AuthContext) 

    const [comments, setComments] = useState<Comment[]>(CommentInitModel)

    useEffect(() => {
        async function fetchComments() {
            const authHeader = await getAuthHeader()
            try {
                const response = await api.get(`/posts/${postId}/comments`, authHeader)

                setComments(response.data)
            } catch(err) {
                console.error(err)
            }
        }

        fetchComments()
    }, [newComment])

    async function handleLikePress(commentId: string) {
        const authHeader = await getAuthHeader()
        const [comment, ...rest] = comments.filter(comment => comment._id === commentId)

        try {
            if(comment && profile && !comment.likes.includes(profile)) {
                await api.post(`/posts/${postId}/comments/${commentId}/like`, null, authHeader)

                comment.likes.push(profile)
                changeCommentItem(comment)
            } else {
                if(profile) {
                    await api.post(`/posts/${postId}/comments/${commentId}/unlike`, null, authHeader)
                
                    const index = comment.likes.indexOf(profile)
                    comment.likes.splice(index, 1)
                    changeCommentItem(comment)
                }
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
        <View>
            {comments && (
                <FlatList
                data={comments.slice(0).reverse()}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => 
                    
                    <View>
                        <View style={styles.heading}>
                            {item.profile.image ? <Image source={{uri: item.profile.urlImage.replace('localhost','192.168.0.12')}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' /> }
                            <Text style={styles.userNameText}>{item.profile.name}</Text>
                            <Text style={styles.userUserText}>{`@${item.profile.user.user}`}</Text>
                        </View>

                        <View style={styles.content}>
                            <Text>{item.description}</Text>
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.footer_item}>
                                <TouchableOpacity onPress={() => handleLikePress}>
                                    {profile && item.likes.includes(profile) ? 
                                        <Heart size={28} color='#81d4fa' weight='fill' /> 
                                        :  
                                        <Heart size={28} />
                                    }
                                </TouchableOpacity>
                                
                                <Text>{item.likes.length}</Text>
                            </View>
                        </View>

                    </View>
                }/> 
            )}
        </View>
    )
}

export default CommentItem;