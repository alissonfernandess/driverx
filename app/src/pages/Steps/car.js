import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

import {useDispatch} from 'react-redux';
import {
  updateCar,
  createUser,
  updateUser,
} from '../../store/modules/app/actions';

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
  const dispatch = useDispatch();

  // estado para visualizar o botao
  const [visible, setVisible] = useState(true);

  const [car, setCar] = useState({
    placa: null,
    marca: null,
    modelo: null,
    cor: null,
  });

  const signIn = () => {
    dispatch(updateCar(car));
    dispatch(createUser());
  };

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
        <Input
          placeholder="Placa do veículo"
          onChangeText={(placa) => setCar({...car, placa})}
          value={car.placa}
        />
        <Spacer />
        <Input
          placeholder="Marca do veículo"
          onChangeText={(marca) => setCar({...car, marca})}
          value={car.marca}
        />
        <Spacer />
        <Input
          placeholder="Modelo do veículo"
          onChangeText={(modelo) => setCar({...car, modelo})}
          value={car.modelo}
        />
        <Spacer />
        <Input
          placeholder="Cor do veículo"
          onChangeText={(cor) => setCar({...car, cor})}
          value={car.cor}
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

export default Car;
