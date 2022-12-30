
import React, { useContext, useEffect }from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from './styles';
import PostItem from '../PostItem';
import { Context as PostContext } from '../../context/PostContext';

const Feed = () => {
  const {getPosts, posts} = useContext(PostContext)

  useEffect(() => {
    getPosts && getPosts()
  },[])
  
  return (
    <View>
      <FlatList
        data={posts.slice(0).reverse()}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => <PostItem post={item} />}
      /> 
      
    </View>
  )
}

export default Feed;