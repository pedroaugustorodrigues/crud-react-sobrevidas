import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import axios from 'axios';
// import { Picker } from '@react-native-picker/picker'; <- Biblioteca para criar o select

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userCPF, setUserCPF] = useState('');
  let [userDate, setUserDate] = useState('');
  let [userNameMother, setUserNameMother] = useState('');
  let [userSUS, setUserSUS] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = async () => {
    if (!userName) {
      alert('Por favor preencha o nome!');
      return;
    }
    if (!userCPF) {
      alert('Por favor preencha o CPF!');
      return;
    }
    if (!userDate) {
      alert('Por favor preencha a data de nascimento!');
      return;
    }
    if (!userNameMother) {
      alert('Por favor preencha o nome da mãe!');
      return;
    }
    if (!userSUS) {
      alert('Por favor preencha o cartão do sus!');
      return;
    }
    if (!userContact) {
      alert('Por favor preencha o contato');
      return;
    }
    if (!userAddress) {
      alert('Por favor preencha o endereço!');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: userName,
        cpf: userCPF,
        date: userDate,
        nameMother: userNameMother,
        sus: userSUS,
        contact: userContact,
        address: userAddress,
      });

      Alert.alert(
        'Sucesso',
        'Usuário Registrado com Sucesso !!!',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Erro ao tentar registrar o usuário:', error);
      Alert.alert('Erro', 'Não foi possível registrar o usuário.');
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
              <Mytextinput
                placeholder="Entre com o Nome"
                onChangeText={setUserName}
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Entre com o CPF"
                onChangeText={setUserCPF}
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Entre com a Data de Nascimento"
                onChangeText={setUserDate}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o Nome da Mãe"
                onChangeText={setUserNameMother}
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Entre com o Cartão do SUS"
                onChangeText={setUserSUS}
                maxLength={15}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o Telefone"
                onChangeText={setUserContact}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o Endereço"
                onChangeText={setUserAddress}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Salvar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
