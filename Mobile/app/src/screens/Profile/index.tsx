import React, {useContext, useEffect} from 'react';
import { UserCircle } from 'phosphor-react-native'
import { View, Text, Image} from 'react-native';
import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserProfileContext } from '../../context/UserProfileContext';
import { styles } from './styles';

const Profile = () => {

  const { user, logout} = useContext(AuthContext)

  const { getUserProfile, profile} = useContext(UserProfileContext)

  useEffect(() => {
    getUserProfile && getUserProfile()
  }, [])


  const newProfileUrlImage = profile.urlImage.replace('localhost','192.168.0.12')

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        {profile.image ? <Image source={{uri: newProfileUrlImage}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' color={'white'} /> }
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.container_text}>
          <Text style={styles.text}>{`user: ${user}`}</Text>
          <Text style={styles.text}>{`seguidores: ${profile.followers.length}`}</Text>
          <Text style={styles.text}>{`seguindo: ${profile.following.length}`}</Text>
        </View>
        <Button title='Sair' onPress={logout} />
      </View>
      
    </View>
    
  )
}

export default Profile;