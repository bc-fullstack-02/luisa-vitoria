import { UsersFour, UserCircle } from 'phosphor-react-native';
import React, { useContext, useEffect} from 'react';
import { View, Text, FlatList,  } from 'react-native';
import { Context as ProfileContext } from '../../context/ProfileContext';

import Profiles from '../../components/Profiles';

import { styles } from './styles';

const Friends = () => {
  const { profiles, getProfiles } = useContext(ProfileContext)

  useEffect(() => {
    getProfiles && getProfiles()
  },[])
  
  return (
    <View style={styles.container}>

      <View style={styles.heading}>
        <UsersFour size={48} weight='thin' color='white' />
        <Text style={styles.text_heading}>Amigos</Text>
      </View>

      <FlatList
        data={profiles.slice(0).reverse()}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => <Profiles profile={item}/>}
      /> 

    </View>
  )
}

export default Friends;