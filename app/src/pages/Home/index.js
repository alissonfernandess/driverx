import React, {useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';

import {Marker, Polyline} from 'react-native-maps';

import initialMarker from '../../assets/initial-marker.png';
import finalMarker from '../../assets/final-marker.png';
import driverIcon from '../../assets/driver.png';

import socketService from '../../services/socket';
import apiService from '../../services/api';

import {
  Container,
  Map,
  Avatar,
  SubTitle,
  Title,
  Spacer,
  Input,
  Button,
  ButtonText,
  VerticalSeparator,
  Bullet,
  PulseCircle,
} from '../../styles';

const Home = ({navigation}) => {
  // pegando o estado no reducer
  const {user, ride} = useSelector((state) => state.app);
  const rideStatus = () => {
    if (ride?.user?._id) {
      if (ride?.driver?._id) {
        return 'inRide';
      } else {
        return 'inSearch';
      }
    }

    return 'empty';
  };

  // useRefs
  const mapRef = useRef(null); 
  const socketRef = useRef();

  // auto foco no map
  const rideStatus = () => {}

  // update user socketid
  const updateSocketId = async (socketId) => {
    try {
      await apiService.put(`/socket/${user._id}`, {socketId});
      console.log('socket updated');
    } catch (error) {
      console.log('update socketId error => ' + err.message);
    }
  }

  // init socket client
  const initSocket = () => {
    socketRef = socketService();

    socketRef.current.on('connect', () => {
      // get socketId
      const socketId = socketRef.current.id;
      // update user socketid
      updateSocketId(socketId);

      console.log('CONECTADO');
    });
  }

  // initSocket
  useEffect(() => {
    initSocket()
  }, [])

  // auto foco no map
  useEffect(() => {
   mapRef.current.fitToCoordinates(ride?.info?.route, {
     options: {
      edgePadding: {
        top: 100,
        right: 70,
        bottom: 150,
        left: 70,
      },
     }
   });
  }, [ride])

  return (
    <Container>
      <Map
        ref={mapRef}
        initialRegion={{
          latitude: -30.011364,
          longitude: -51.1637373,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        disabled={rideStatus() === 'inSearch'}>
        {/* EXIBI A ROUTA NO MAP */}
        {ride?.info?.route && (
          <>
            <Polyline
              coordinates={ride?.info?.route}
              strokeWidth={4}
              strokeColor="#000"
            />

            <Marker coordinate={ride?.info?.route[0]}>
              <Avatar source={initialMarker} small />
            </Marker>
            <Marker
              coordinate={ride?.info?.route[ride?.info?.route.length - 1]}>
              <Avatar source={finalMarker} small />
            </Marker>
          </>
        )}
      </Map>
      {/* PARTE SUPERIOR */}
      <Container
        position="absolute"
        justify="space-between"
        align="flex-start"
        padding={20}
        zIndex={999}
        pointerEvents="box-none"
        style={{height: '100%'}}>
        {/* AVATAR */}
        <Container height={100} justify="flex-start" align="flex-start">
          {rideStatus() === 'empty' && !ride?.info && (
            <TouchableOpacity>
              <Avatar
                source={{
                  uri: `https://graph.facebook.com/${user.fbId}/picture?type=large&access_token=${user.accessToken}`,
                }}
              />
            </TouchableOpacity>
          )}

          {rideStatus() !== 'empty' && user.tipo === 'P' && ride?.info && (
            <Container elevation={50} justify="flex-end" color="light">
              <Container padding={20}>
                <Container justify="flex-start" row>
                  <Bullet />
                  <SubTitle numberOfLines={1}>
                    {' '}
                    {ride?.info?.start_address}
                  </SubTitle>
                </Container>
                <Spacer height={20} />
                <Container justify="flex-start" row>
                  <Bullet destination />
                  <SubTitle numberOfLines={1}>
                    {' '}
                    {ride?.info?.end_address}
                  </SubTitle>
                </Container>
              </Container>
              <Button type="dark" compact>
                <ButtonText color="light">Toque para editar</ButtonText>
              </Button>
            </Container>
          )}
        </Container>

        {/* PASSAGEIRO PROCURANDO CORRIDA */}
        {rideStatus() === 'inRide' && user.tipo === 'P' && (
          <Container padding={20} zIndex={-1}>
            <PulseCircle
              numPulses={3}
              diameter={400}
              speed={20}
              duration={2000}
            />
          </Container>
        )}

        {/* PASSAGEIRO SEM CORRIDA */}
        <Container elevation={50} height={150} color="light">
          {user.tipo === 'P' && rideStatus() === 'empty' && !ride?.info && (
            <Container justify="flex-start" aling="flex-start" padding={20}>
              <SubTitle>Olá, Alisson Fernandes</SubTitle>
              <Title>Para onde você quer ir?</Title>
              <Spacer />
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  navigation.navigate('Ride');
                }}>
                <Input editable={false} placeholder="Procure um destino..." />
              </TouchableOpacity>
            </Container>
          )}

          {/* PASSAGEIRO INFORMAÇÕES DA CORRIDA */}
          {user.tipo === 'P' && rideStatus() !== 'inRide' && ride?.info && (
            <Container justify="flex-end" aling="flex-start">
              <Container padding={20}>
                <SubTitle>Driverx Convencional</SubTitle>
                <Spacer />
                <Container row>
                  <Container>
                    <Title>R$ {ride?.info?.price}</Title>
                  </Container>
                  <VerticalSeparator />
                  <Container>
                    <Title>{ride?.info?.duration?.text}</Title>
                  </Container>
                </Container>
              </Container>
              <Button type={rideStatus() === 'inSearch' ? 'muted' : 'primary'}>
                <ButtonText>
                  {rideStatus() === 'inSearch'
                    ? 'Cancelar Driverx'
                    : 'Chamar Driverx'}
                </ButtonText>
              </Button>
            </Container>
          )}

          {/* PASSAGEIRO EM CORRIDA */}
          {user.tipo === 'P' && rideStatus() === 'inRide' && (
            <Container border="primary" justify="flex-end" align="flex-start">
              <Container row padding={20}>
                <Container align="flex-start" row>
                  <Avatar
                    small
                    source={{
                      uri:
                        'https://img.etimg.com/thumb/width-640,height-480,imgsize-436664,resizemode-1,msid-72360263/magazines/panache/joker-fame-joaquin-phoenix-a-vegan-since-3-named-petas-person-of-the-year/joaquin-phoenix-recently-appeared-in-petas-we-are-all-animals-billboards-in-times-square-and-on-sunset-billboard-as-he-promoted-legislation-to-ban-travelling-wild-animal-circuses-.jpg',
                    }}
                  />
                  <Spacer width="10px" />
                  <Container align="flex-start">
                    <SubTitle bold>João Right</SubTitle>
                    <SubTitle small>ABC-123, BMW X6, Preta</SubTitle>
                  </Container>
                </Container>
                <VerticalSeparator />
                <Container width={120}>
                  <Title>R$ 12,90</Title>
                  <SubTitle bold color="primary">
                    Aprox. 5 mins
                  </SubTitle>
                </Container>
              </Container>
              <Button type="muted">
                <ButtonText>Cancelar Corrida</ButtonText>
              </Button>
            </Container>
          )}

          {/* MOTORISTA SEM CORRIDA */}
          {user.tipo === 'M' && rideStatus() === 'empty' && (
            <Container>
              <SubTitle>Olá, João</SubTitle>
              <Title>Nenhuma corrida encontrada.</Title>
            </Container>
          )}

          {/* MOTORISTA ESTÁ EM CORRIDA */}
          {user.tipo === 'M' && ride?.info && (
            <Container border="primary" justify="flex-end" align="flex-start">
              <Container row padding={20}>
                <Container align="flex-start" row>
                  <Avatar
                    small
                    source={{
                      uri:
                        'https://img.etimg.com/thumb/width-640,height-480,imgsize-436664,resizemode-1,msid-72360263/magazines/panache/joker-fame-joaquin-phoenix-a-vegan-since-3-named-petas-person-of-the-year/joaquin-phoenix-recently-appeared-in-petas-we-are-all-animals-billboards-in-times-square-and-on-sunset-billboard-as-he-promoted-legislation-to-ban-travelling-wild-animal-circuses-.jpg',
                    }}
                  />
                  <Spacer width="10px" />
                  <Container align="flex-start">
                    {/* <SubTitle bold>Alisson (2km)</SubTitle> */}
                    <Container>
                      <Container justify="flex-start" height={20} row>
                        <Bullet />
                        <SubTitle small numberOfLines={1}>
                          {' '}
                          Endereço de embarque completo
                        </SubTitle>
                      </Container>
                      <Container justify="flex-start" height={20} row>
                        <Bullet destination />
                        <SubTitle small numberOfLines={1}>
                          {' '}
                          Endereço de destino completo
                        </SubTitle>
                      </Container>
                    </Container>
                  </Container>
                  <Spacer width="10px" />
                </Container>
                <VerticalSeparator />
                <Container width={100}>
                  <Title small>R$ 12,90</Title>
                  <SubTitle bold color="primary" small>
                    Aprox. 5 mins
                  </SubTitle>
                </Container>
              </Container>
              <Button type="primary">
                <ButtonText>Aceitar Corrida</ButtonText>
              </Button>
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
