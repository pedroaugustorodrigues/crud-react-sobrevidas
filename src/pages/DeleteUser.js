import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = async () => {
    if (!inputUserId) {
      Alert.alert('Erro', 'Por favor, entre com um código de usuário válido!');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/${inputUserId}`);
      if (response.status === 200) {
        Alert.alert(
          'Sucesso',
          'Usuário Excluído com Sucesso!',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Erro', 'Erro ao excluir o usuário.');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      Alert.alert('Erro', 'Por favor, entre com um código de usuário válido!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entre com o Código do Usuário"
            onChangeText={setInputUserId}
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Usuário" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
