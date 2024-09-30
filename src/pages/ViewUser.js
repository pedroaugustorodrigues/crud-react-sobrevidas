import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = async () => {
    console.log(inputUserId);
    setUserData({});

    try {
      const response = await axios.get(`${API_URL}/${inputUserId}`);
      if (response.data) {
        setUserData(response.data);
      } else {
        Alert.alert('Usuário não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert('Erro', 'Usuário não encontrado!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Usuário" />
          <Mytextinput
            placeholder="Entre com o Código do Usuário"
            onChangeText={setInputUserId}
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Usuário" customClick={searchUser} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>Código: {userData.id}</Text>
            <Text>Nome: {userData.name}</Text>
            <Text>Telefone: {userData.contact}</Text> {/* Corrigido para 'contact' */}
            <Text>Endereço: {userData.address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
