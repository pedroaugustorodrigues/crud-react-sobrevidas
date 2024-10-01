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
import { Picker } from '@react-native-picker/picker';
import { RollInRight } from 'react-native-reanimated';

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userCPF, setUserCPF] = useState('');
  let [userDate, setUserDate] = useState('');
  let [userNameMother, setUserNameMother] = useState('');
  let [userGender, setUserGender] = useState('');
  let [userSUS, setUserSUS] = useState('');
  let [userContact1, setUserContact1] = useState('');
  let [userContact2, setUserContact2] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userCep, setUserCep] = useState('');
  let [userBurgh, setUserBurgh] = useState('');
  let [userStreet, setUserStreet] = useState('');
  let [userComplement, setUserComplement] = useState('');
  let [userNumber, setUserNumber] = useState('');

  let register_user = async () => {
    // Validações já existentes
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
    if (!userGender) {
      alert('Por favor selecione o gênero!');
      return;
    }
    if (!userContact1) {
      alert('Por favor preencha o contato 1');
      return;
    }
    if (!userContact2) {
      alert('Por favor preencha o contato 2');
      return;
    }
    if (!userEmail) {
      alert('Por favor preencha o Email');
      return;
    }
    if (!userCep) {
      alert('Por favor preencha o CEP');
      return;
    }
    if (!userBurgh) {
      alert('Por favor preencha o bairro');
      return;
    }
    if (!userStreet) {
      alert('Por favor preencha o logradouro');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: userName,
        cpf: userCPF,
        date: userDate,
        nameMother: userNameMother,
        gender: userGender,
        sus: userSUS,
        contact1: userContact1,
        contact2: userContact2,
        email: userEmail,
        cep: userCep,
        burgh: userBurgh,
        street: userStreet,
        complement: userComplement,
        number: userNumber,
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

            {/* Componente de seleção de gênero */}
              <View style={{ padding: 10 }}>
                  <Picker
                    selectedValue={userGender}
                    onValueChange={(itemValue) => setUserGender(itemValue)}
                    style={{ marginLeft: 25,
                      marginRight: 25,
                      padding: 10,
                      textAlignVertical: 'top',
                      borderColor: '#00AD98',
                      borderWidth: 1,
                      color: '#00AD98',
                    }}
                  >
                    <Picker.Item label="Selecione o Gênero" value="" />
                    <Picker.Item label="Masculino" value="masculino" />
                    <Picker.Item label="Feminino" value="feminino" />
                  </Picker>
              </View>

              <Mytextinput
                placeholder="Entre com o Cartão do SUS"
                onChangeText={setUserSUS}
                maxLength={15}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
              <Mytextinput
                placeholder="Entre com o Telefone 1"
                onChangeText={setUserContact1}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10, width: '40vw', }}
              />
              <Mytextinput
                placeholder="Entre com o Telefone 2"
                onChangeText={setUserContact2}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10, width: '40vw',  }}
              />
              </View>
            
              <Mytextinput
                placeholder="Entre com o Email"
                onChangeText={setUserEmail}
                style={{ padding: 10 }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between',     marginVertical: 8 }}>
                <Mytextinput
                  placeholder="Entre com o CEP"
                  onChangeText={setUserCep}
                  maxLength={9}
                  style={{ padding: 10, width: '40vw', }}
                />
              <Mytextinput
                placeholder="Entre com o Bairro"
                onChangeText={setUserBurgh}
                style={{ padding: 10, width: '40vw',  }}
              />
              </View>

              <Mytextinput
                placeholder="Entre com o Logradouro"
                onChangeText={setUserStreet}
                style={{ padding: 10 }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between',     marginVertical: 10 }}>
                <Mytextinput
                  placeholder="Entre com o Complemento"
                  onChangeText={setUserComplement}
                  style={{ padding: 10, width: '70vw' }}
                />
              <Mytextinput
                placeholder="Numero"
                onChangeText={setUserNumber}
                keyboardType="numeric"
                style={{ padding: 10, width: '10vw' }}
              />
              </View>
             
              <Mybutton title="Confirmar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
