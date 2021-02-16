import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

import api from '../../services/api';

import {useDispatch} from 'react-redux';
import {getRideInfos} from '../../store/modules/app/actions';

import {
  Container,
  Title,
  SubTitle,
  Input,
  Button,
  ButtonText,
  AddressList,
  AddressItem,
} from '../../styles';

const Ride = () => {
  const dispatch = useDispatch();

  // estado para visualizar o botao
  const [visible, setVisible] = useState(true);
  const [list, setList] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const getPlaces = async (address) => {
    try {
      const response = await api.get(`address/${address}`);
      const res = response.data;

      if (res.error) {
        alert(res.message);
        return false;
      }

      setList(res.list);
    } catch (err) {
      alert(err.message);
    }
  };

  const getRide = () => {
    dispatch(getRideInfos(origin.place_id, destination.place_id));
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
    <>
      <Container row height={50} justify="flex-start">
        <Container align="flex-start" padding={20}>
          <SubTitle>Voltar</SubTitle>
        </Container>
        <Container>
          <Title>Corrida</Title>
        </Container>
        <Container align="flex-end" padding={20} />
      </Container>

      <Container padding={30} justify="flex-start">
        <Container height={90} justify="flex-start">
          <Input
            onFocus={() => setActiveInput('setDestination')}
            value={origin.description}
            placeholder="Embarque"
            onChangeText={(address) => getPlaces(address)}
          />
          <Input
            onFocus={() => setActiveInput('setDestination')}
            value={destination.description}
            placeholder="Destino"
            onChangeText={(address) => getPlaces(address)}
          />
        </Container>

        <Container>
          <AddressList
            data={list}
            keyExtractor={(item) => item.place_id}
            renderItem={({item, index}) => (
              <AddressItem onPress={() => eval(activeInput)(item)}>
                <SubTitle bold>{item.description}</SubTitle>
                <SubTitle small>{item.secondary_text}</SubTitle>
              </AddressItem>
            )}
          />
        </Container>
      </Container>

      {visible && (
        <Container height={70} justify="flex-end">
          <Button onPress={() => getRide()}>
            <ButtonText>Comece a user</ButtonText>
          </Button>
        </Container>
      )}
    </>
  );
};

export default Ride;
