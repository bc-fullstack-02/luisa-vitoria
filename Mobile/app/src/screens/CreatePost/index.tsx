
import React, {useState, useContext} from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  const [photo, setPhoto] = useState(null);
  const [photoShow, setPhotoShow] = useState('');
  let formData = new FormData();

  const takePhotoAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
    });

    if (result.canceled) {
      return;
    }
  
    let localUri = result.assets[0].uri;
    setPhotoShow(localUri);
    let filename = localUri.split('/').pop();

    let type;
    if(filename) {
      let match = /\.(\w+)$/.exec(filename);
      type = match ? `image/${match[1]}` : `image`;
    }

    if(result.assets !== null) {
      if(filename && type && localUri) {
        setPhoto(JSON.parse(JSON.stringify({ uri: localUri, name: filename, type })))
      }
    }
    
  }

  if(photo){
    formData.append('file', photo)
    formData.append('title', title)
    formData.append('description', description )
  } else {
    formData.append('title', title)
    formData.append('description', description )
  }


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

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={takePhotoAndUpload}
      >
        <Text style={styles.buttonTextStyle}>Adicionar imagem</Text>
      </TouchableOpacity>

      <View style={{alignItems:'center'}}>
        {photoShow && <Image
            source={{ uri: photoShow }}
            style={styles.post_image}
          /> 
        }
      </View>

      <Spacer>
        <Button onPress={() => { createPost && createPost(formData)}} title='Postar' />
      </Spacer>
    </View>
  )
}

export default CreatePost;
