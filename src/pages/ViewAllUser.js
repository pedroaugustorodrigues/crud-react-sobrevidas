import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-web';

const API_URL = 'http://localhost:3000/pacientes'; // Use o IP se necessário

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setFlatListItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  let listItemView = ({ item }) => {
    return (
      <View
        key={item.id} // Chave correta
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.id}</Text> 

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.name}</Text>

        <Text style={styles.textheader}>CPF</Text>
        <Text style={styles.textbottom}>{item.cpf}</Text>

        <Text style={styles.textheader}>Data de Nascimento</Text>
        <Text style={styles.textbottom}>{item.date}</Text>

        <Text style={styles.textheader}>Nome da Mãe</Text>
        <Text style={styles.textbottom}>{item.nameMother}</Text>

        <Text style={styles.textheader}>Cartão do Sus</Text>
        <Text style={styles.textbottom}>{item.sus}</Text>   

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.contact}</Text> 

        <Text style={styles.textheader}>Endereço</Text>
        <Text style={styles.textbottom}>{item.address}</Text> 
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListItems}
          keyExtractor={(item) => item.id.toString()} // Chave correta
          renderItem={listItemView} // Removido o destructuring
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',
  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllUser;
