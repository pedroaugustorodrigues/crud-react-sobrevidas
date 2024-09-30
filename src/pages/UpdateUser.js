import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const UpdateUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/${inputUserId}`);
      if (response.data) {
        updateAllStates(
          response.data.name,
          response.data.contact,
          response.data.address
        );
      } else {
        Alert.alert('Usuário não encontrado!');
        updateAllStates('', '', '');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert('Erro', 'Usuário não encontrado!');
    }
  };

  let updateUser = async () => {
    if (!inputUserId) {
      Alert.alert('Por Favor informe o Código!');
      return;
    }
    if (!userName) {
      Alert.alert('Por favor informe o Nome!');
      return;
    }
    if (!userContact) {
      Alert.alert('Por Favor informe o Telefone!');
      return;
    }
    if (!userAddress) {
      Alert.alert('Por Favor informe o Endereço!');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${inputUserId}`, {
        name: userName,
        contact: userContact,
        address: userAddress,
      });

      if (response.status === 200) {
        Alert.alert(
          'Sucesso',
          'Usuário atualizado com sucesso!',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Erro ao atualizar o usuário');
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      Alert.alert('Erro', 'Erro ao atualizar o usuário');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Filtro de Usuário" />
              <Mytextinput
                placeholder="Entre com o Código do Usuário"
                style={{ padding: 10 }}
                onChangeText={setInputUserId}
              />
              <Mybutton
                title="Buscar Usuário"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Entre com o Nome"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={setUserName}
              />
              <Mytextinput
                placeholder="Entre com o Telefone"
                value={userContact}
                onChangeText={setUserContact}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Entre com o Endereço"
                onChangeText={setUserAddress}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Atualizar Usuário"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
