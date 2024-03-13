import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={text => setCep(text)}
        keyboardType="numeric"
      />
      <Button
        title="Buscar"
        onPress={fetchAddress}
        disabled={loading || cep.length !== 8}
      />
      {loading && <Text>Carregando...</Text>}
      {address && (
        <View>
          <Text>CEP: {address.cep}</Text>
          <Text>Logradouro: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'blue',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;