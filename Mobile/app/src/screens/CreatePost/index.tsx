
import React, {useState, useContext} from 'react';
import { View, Text, Image } from 'react-native';
import { UserCircle } from 'phosphor-react-native'
import { Context as PostContext } from '../../context/PostContext';
import { Profile } from '../../@types/profile';
import { Input } from '../../components/Input';
import { THEME } from '../../theme';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';

import { styles } from './styles';

interface CreatePostProps {
  user: string | null;
  name: string | null;
  profileDetails: Profile
}

const CreatePost = ({ user, name, profileDetails }: CreatePostProps) => {

  const { createPost  } = useContext(PostContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {Object.keys(profileDetails).length !== 0 && profileDetails.image ? <Image source={{uri: profileDetails.urlImage.replace('localhost','192.168.0.12')}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' color='white'/> }
        <Text style={styles.userNameText}>{name}</Text>
        <Text style={styles.userUserText}>{`@${user}`}</Text>
      </View>

      <Spacer>
        <Text style={styles.title}>Novo Post</Text>
      </Spacer>
      
      <Spacer>
        <Input.Root>
          <Input.Input 
            value={title} 
            onChangeText={setTitle} placeholder='Digite o título do post...' placeholderTextColor={THEME.COLORS.INPUT} 
            autoCapitalize='none' 
            autoCorrect
          />
        </Input.Root>
      </Spacer>
      <Spacer>
        <Input.Root>
          <Input.Input 
            value={description} 
            onChangeText={setDescription} placeholder='Digite a descrição do post...' placeholderTextColor={THEME.COLORS.INPUT} 
            autoCapitalize='none' 
            autoCorrect
          />
        </Input.Root>
      </Spacer>

      <Spacer>
        <Button onPress={() => { createPost && createPost({ title, description})}} title='Postar' />
      </Spacer>
    </View>
  )
}

export default CreatePost;
