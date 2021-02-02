import React from 'react';
import {Image} from 'react-native';

import socialService from '../../services/socialService';

import logo from '../../assets/logo.png';
import bgBottom from '../../assets/bg-bottom-login.png';

import {Container, Button, ButtonText} from '../../styles';

const Login = () => {
  const login = async () => {
    try {
      const auth = await socialService.authorize('facebook', {
        scopes: 'email',
      });

      const user = await socialService.makeRequest(
        'facebook',
        '/me?fileds=id, name, email',
      );

      console.tron.log(auth);
      console.tron.log(user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container color="info50" justify="flex-end">
      <Container
        justify="space-around"
        padding={30}
        position="absolute"
        height={270}
        top={0}
        zIndex={9}>
        <Image source={logo} />

        <Button type="info" onPress={() => login()}>
          <ButtonText>Fazer Login com Facebook</ButtonText>
        </Button>

        <Button type="light">
          <ButtonText>Fazer Login com Facebook</ButtonText>
        </Button>
      </Container>

      <Image source={bgBottom} />
    </Container>
  );
};

export default Login;
