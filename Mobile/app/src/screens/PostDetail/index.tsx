
import React, {useEffect, useState, useContext} from 'react';
import { View, TextInput, TouchableOpacity, Text} from 'react-native';
import api from '../../services/api';
import { Context as PostContext} from '../../context/PostContext';
import { Context as AuthContext} from '../../context/AuthContext';
import { styles } from './styles';
import { getAuthHeader } from '../../services/auth';
import { THEME } from '../../theme';
import { Post } from '../../@types/post';
import CommentItem from '../../components/CommentItem';
import PostItem from '../../components/PostItem';

export const PostInitModel =  {
    _id: '', 
    title: '', 
    description: '', 
    profile: { 
        name: '', 
        user: {
            user: ''
        },
        image: false,
        urlImage: ''
    },
    comments: [{
        _id: '',
        description: '',
        likes: [''],
        profile: {
            image: false,
            urlImage: '',
            _id: '',
            name: '',
            user: '',
        }
    }],
    likes: [''],
    image: false,
    urlImage: '',
    likedByUser: false
}


const PostDetail = ({ route }: {route: any, navigation: any}) => {
    const { postId } = route.params;
    const { likePost, unlikePost } = useContext(PostContext)
    const { profile } = useContext(AuthContext)

    const [postDetail, setPostDetail] = useState<Post>(PostInitModel)
    const [newComment, setNewComment] = useState('')

    async function fetchPostDetail() {
        const auth = await getAuthHeader()
        try {
            const response = await api.get(`/posts/${postId}`, auth )

            setPostDetail(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPostDetail()
    }, [])

    function handleLikePress(postId: string) {
        if(postDetail && profile && postDetail.likes.includes(profile)) {
            unlikePost && unlikePost({ postId: postDetail._id})
            fetchPostDetail()
        } else {
            postDetail && likePost && likePost({postId:  postDetail._id})
            fetchPostDetail()
        }
    }

    async function handleComment() {
        const auth = await getAuthHeader()
        const data = {
            description: newComment
        }

        try {
            const response = await api.post(`/posts/${postId}/comments`, data , auth)
            const comment = response.data

            setNewComment({...comment})
        } catch(err) {
            console.error(err)
        }
    }
    console.log(newComment)

  return (
    <View style={styles.container}>
        {postDetail && <PostItem post={postDetail} handleLike={handleLikePress} />}
        <View style={styles.input_container}>
            <TextInput value={newComment} placeholder='adicione um comentário...' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect style={styles.input}></TextInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={handleComment}>
            <Text style={styles.button_text}>Comentar</Text>
            </TouchableOpacity>
        </View>

        {postDetail && postDetail._id !== '' && <CommentItem newComment={newComment} postId={postDetail._id} />}
        
    </View>
  )
}

export default PostDetail;