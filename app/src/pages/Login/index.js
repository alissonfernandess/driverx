import React, {useEffect} from 'react';
import {Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import socialService from '../../services/socialService';
import facebookApi from '../../services/facebook';

import {useDispatch} from 'react-redux';
import {updateUser, checkUser} from '../../store/modules/app/actions';

import logo from '../../assets/logo.png';
import bgBottom from '../../assets/bg-bottom-login.png';

import {Container, Button, ButtonText} from '../../styles';

const Login = ({navigator}) => {
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const auth = await socialService.authorize('facebook', {
        scopes: 'email',
      });

      // erro ao pegar email e token
      // const user = await socialService.makeRequest(
      //   'facebook',
      //   '/me?fileds=id, name, email',
      // );

      const user = await facebookApi.get(
        `/me?fields=id,name,email&access_token=${auth.response.credentials.accessToken}`,
      );

      // updateUser reducer
      dispatch(
        updateUser({
          fbId: user.data.id,
          nome: user.data.name,
          email: user.data.email,
          tipo: 'M',
          acessToken: auth.response.credentials.accessToken,
        }),
      );

      // check user
      dispatch(checkUser());
    } catch (error) {
      alert(error.message);
    }
  };

  const checkLogin = async () => {
    // get user
    const user = await AsyncStorage.getItem('@user');

    if (user) {
      // add user reducer
      dispatch(updateUser(JSON.parse(user)));

      navigator.replace('Home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

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
