import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

import {
  Container,
  Title,
  SubTitle,
  Input,
  Spacer,
  Button,
  ButtonText,
} from '../../styles';

const Car = () => {
  // estado para visualizar o botao
  const [visible, setVisible] = useState(true);

  // ao carregar verficar o estado do botao
  useEffect(() => {
    const keyboarDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setVisible(false),
    );

    const keyboarDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setVisible(true),
    );

    return () => {
      keyboarDidShowListener.remove();
      keyboarDidHideListener.remove();
    };
  }, []);

  return (
    <Container padding={30} justify="flex-start">
      <Container aling="flex-start" height={40}>
        <Title>Cadastre seu veículo</Title>
        <SubTitle>Preencha os campos abaixo.</SubTitle>
      </Container>

      <Container justify="flex-start">
        <Spacer height={50} />
        <Input placeholder="Placa do veículo" />
        <Spacer />
        <Input placeholder="Modelo do veículo" />
        <Spacer />
        <Input placeholder="Cor do veículo" />
      </Container>

      {visible && (
        <Container height={70} justify="flex-end">
          <Button>
            <ButtonText>Comece a user</ButtonText>
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Car;
