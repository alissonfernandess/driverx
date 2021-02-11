import React from 'react';
import {Image} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../store/modules/app/actions';

import car from '../../assets/car.png';
import hand from '../../assets/hand.png';

import {
  Container,
  Title,
  SubTitle,
  PickerButton,
  Button,
  ButtonText,
} from '../../styles';

const Type = () => {
  // get INITIAL_STATE user reducer
  const {user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const toogleType = (tipo) => {
    dispatch(updateUser({tipo}));
  };

  return (
    <Container padding={30} justify="flex-start">
      <Container aling="flex-start" height={40}>
        <Title>Passageiro ou motorista?</Title>
        <SubTitle>Selecione qual será a sua função no Drivex</SubTitle>
      </Container>

      <Container>
        <PickerButton
          onPress={() => toogleType('M')}
          active={user.tipo === 'M'}>
          <Image source={car} />
          <Title>Motorista</Title>
        </PickerButton>

        <PickerButton>
          <Image
            source={hand}
            onPress={() => toogleType('P')}
            active={user.tipo === 'P'}
          />
          <Title>Passageiro</Title>
        </PickerButton>
      </Container>

      <Container height={70}>
        <Button>
          <ButtonText>Próximo Passo</ButtonText>
        </Button>
      </Container>
    </Container>
  );
};

export default Type;
