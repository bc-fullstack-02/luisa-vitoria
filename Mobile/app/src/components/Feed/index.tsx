
import React, { useContext, useEffect }from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from './styles';

import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext} from '../../context/AuthContext';
import PostItem from '../PostItem';

const Feed = ({screenName, navigation}: {screenName: any, navigation: any}) => {
  const {getPosts, posts} = useContext(PostContext)

  useEffect(() => {
    getPosts && getPosts()
  },[])

  const { likePost, unlikePost } = useContext(PostContext)
    const { profile } = useContext(AuthContext)


    function handleLikePress(postId: string) {
       const [post, ...rest] = posts.filter(post => post._id === postId)
        if(profile && post.likes.includes(profile)) {
            unlikePost && unlikePost({ postId: post._id})
        } else {
            likePost && likePost({postId: post._id})
        }
    }
  
  return (
    <View>
      <FlatList
        data={posts.slice(0).reverse()}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => <PostItem handleLike={handleLikePress} post={item} screenName={screenName} navigation={navigation} />}
      /> 
      
    </View>
  )
}

export default Feed;