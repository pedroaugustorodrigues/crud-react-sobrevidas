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
  let [userContact1, setUserContact1] = useState('');
  let [userContact2, setUserContact2] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userCep, setUserCep] = useState('');
  let [userBurgh, setUserBurgh] = useState('');
  let [userStreet, setUserStreet] = useState('');
  let [userComplement, setUserComplement] = useState('');
  let [userNumber, setUserNumber] = useState('');
  

  let updateAllStates = (name, contact1, contact2, email, cep, burgh, street, complement, number) => {
    setUserName(name);
    setUserContact1(contact1);
    setUserContact2(contact2);
    setUserEmail(email);
    setUserCep(cep);
    setUserBurgh(burgh);
    setUserStreet(street);
    setUserComplement(complement);
    setUserNumber(number);
  };

  let searchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/${inputUserId}`);
      if (response.data) {
        updateAllStates(
          response.data.name,
          response.data.contact1,
          response.data.contact2,
          response.data.email,
          response.data.cep,
          response.data.burgh,
          response.data.street,
          response.data.complement,
          response.data.number,
        );
      } else {
        Alert.alert('Paciente não encontrado!');
        updateAllStates('', '', '');
      }
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      Alert.alert('Erro', 'Paciente não encontrado!');
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
    if (!userContact1) {
      Alert.alert('Por Favor informe o Telefone 1!');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${inputUserId}`, {
        name: userName,
        contact1: userContact1,
        contact2: userContact2,
        email: userEmail,
        cep: userCep,
        burgh: userBurgh,
        street: userStreet,
        complement: userComplement,
        number: userNumber,
      });

      if (response.status === 200) {
        Alert.alert(
          'Sucesso',
          'Paciente atualizado com sucesso!',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Erro ao atualizar o paciente');
      }
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      Alert.alert('Erro', 'Erro ao atualizar o paciente');
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
              <Mytext text="Filtro de Paciente" />
              <Mytextinput
                placeholder="Entre com o Código do Paciente"
                style={{ padding: 10 }}
                onChangeText={setInputUserId}
              />
              <Mybutton
                title="Buscar Paciente"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Entre com o Nome"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={setUserName}
              />
              <Mytextinput
                placeholder="Entre com o Telefone 1"
                value={userContact1}
                onChangeText={setUserContact1}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
               <Mytextinput
                placeholder="Entre com o Telefone 2"
                value={userContact2}
                onChangeText={setUserContact2}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />

               <Mytextinput
                placeholder="Entre com o Email"
                value={userEmail}
                onChangeText={setUserEmail}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o CEP"
                value={userCep}
                onChangeText={setUserCep}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o Bairro"
                value={userBurgh}
                onChangeText={setUserBurgh}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o Logradouro"
                value={userStreet}
                onChangeText={setUserStreet}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o Complemento"
                value={userComplement}
                onChangeText={setUserComplement}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Entre com o Número"
                value={userNumber}
                onChangeText={setUserNumber}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
    
              <Mybutton
                title="Atualizar Paciente"
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
