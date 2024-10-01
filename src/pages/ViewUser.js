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
        Alert.alert('Paciente não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      Alert.alert('Erro', 'Paciente não encontrado!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Paciente" />
          <Mytextinput
            placeholder="Entre com o Código do Paciente"
            onChangeText={setInputUserId}
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Paciente" customClick={searchUser} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>Código: {userData.id}</Text>
            <Text>Nome: {userData.name}</Text>
            <Text>CPF: {userData.cpf}</Text>
            <Text>Data de Nascimento: {userData.date}</Text>
            <Text>Nome da Mãe: {userData.nameMother}</Text>
            <Text>Sexo: {userData.gender}</Text>
            <Text>Cartão do Sus: {userData.sus}</Text>
            <Text>Telefone 1: {userData.contact1}</Text>
            <Text>Telefone 1: {userData.contact2}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>CEP: {userData.cep}</Text>
            <Text>Bairro: {userData.burgh}</Text>
            <Text>Logradouro: {userData.street}</Text>
            <Text>Complemento: {userData.complement}</Text>
            <Text>Número: {userData.number}</Text>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
