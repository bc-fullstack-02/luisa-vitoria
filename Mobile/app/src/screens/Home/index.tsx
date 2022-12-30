import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { UserCircle, NotePencil } from 'phosphor-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Feed from '../../components/Feed';
import { Profile } from '../../@types/profile';


interface HomeProps {
  navigation: NativeStackNavigationProp<any, any>;
  user: string | null;
  name: string | null;
  profileDetails: Profile
}

const Home = ({navigation, user, name, profileDetails}: HomeProps) => {
  
  function handlePencilPress() {
    navigation.navigate("CreatePost")
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {Object.keys(profileDetails).length !== 0 && profileDetails.image ? <Image source={{uri: profileDetails.urlImage.replace('localhost','192.168.0.12')}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' color='white'/> }
        <Text style={styles.userNameText}>{name}</Text>
        {user && <Text style={styles.userUserText}>{`@${user}`}</Text> }
        <View style={{flex: 1}}></View>
        <TouchableOpacity onPress={handlePencilPress}>
          <NotePencil color='white' weight='thin' size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Feed />
      </View>
      
    </View>
  )
}

export default Home;