
import { UserCircle, UsersFour } from 'phosphor-react-native';
import React, {useContext} from 'react';
import { Text, TouchableOpacity, View, Image} from 'react-native';
import { Profile } from '../../@types/profile';
import { Context as AuthContext} from '../../context/AuthContext';
import { Context as ProfileContext} from '../../context/ProfileContext';

import { styles } from './styles';

interface ProfileItemProps {
  profile: Profile;
}

const Profiles = ({profile}: ProfileItemProps) => {

  const { profile: userProfile } = useContext(AuthContext)
  const { followProfile, unfollowProfile } = useContext(ProfileContext)

  const newProfileUrlImage = profile.urlImage.replace('localhost','192.168.0.12')

  function handleFollowPress() {
    if(userProfile && profile.followers.includes(userProfile)) {
      unfollowProfile && unfollowProfile({profileId: profile._id})
    } else {
      followProfile && followProfile({ profileId: profile._id})
    }
  }

  return (
    <View style={styles.item}>
      <View style={styles.heading_item}>
        {profile.image ? <Image source={{uri: newProfileUrlImage}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' /> }

        <Text style={styles.userNameText}>{profile.name}</Text>
        {profile.user && <Text style={styles.userUserText}>{`@${profile.user.user}`}</Text> }
      </View>

      {userProfile && profile.followers.includes(userProfile) ? 
        <View style={styles.button_list}>
          <TouchableOpacity style={styles.button_disabled} disabled>
            <Text>Seguir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleFollowPress}>
            <Text>Deixar de seguir</Text>
          </TouchableOpacity>
        </View>
      : 
        <View style={styles.button_list}>
          <TouchableOpacity style={styles.button} onPress={handleFollowPress}>
            <Text>Seguir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_disabled} disabled>
            <Text>Deixar de seguir</Text>
          </TouchableOpacity>
        </View>
      
      }

      
    </View>

  )
}

export default Profiles;