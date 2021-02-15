import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';

import {
  Container,
  Title,
  SubTitle,
  Spacer,
  Button,
  ButtonText,
} from '../../styles';

const Payment = () => {
  // estado para visualizar o botao
  const [visible, setVisible] = useState(true);
  const [payment, setPayment] = useState({
    nome: null,
    numero: null,
    validade: null,
    cvv: null,
  });

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
        <Title>Escolha como pagar</Title>
        <SubTitle>Preencha os dados do cartão de crédito</SubTitle>
      </Container>

      <Container>
        <Spacer height={100} />
        <CreditCardInput
          requiresName
          onChange={(e) => {
            const {number, expiry, cvc, name} = e.values;
            setPayment({
              numero: number,
              nome: name,
              validade: expiry,
              cvv: cvc,
            });
          }}
        />
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

export default Payment;
