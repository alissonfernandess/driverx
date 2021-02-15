import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';

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

const Home = () => {
  // pegando o estado no reducer
  const {user} = useSelector((state) => state.app);
  const type = 'M';
  const status = 'C'; //S = SEM CORRIDA, I = INFORMAÇÕES, P = PESQUISA, C = CORRIDA

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -30.011364,
          longitude: -51.1637373,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        disabled={status === 'P'}
      />
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
          {status === 'S' && (
            <TouchableOpacity>
              <Avatar
                source={{
                  uri: `https://graph.facebook.com/${user.fbId}/picture?type=large&access_token=${user.accessToken}`,
                }}
              />
            </TouchableOpacity>
          )}

          {status !== 'S' && user.tipo === 'P' && (
            <Container elevation={50} justify="flex-end" color="light">
              <Container padding={20}>
                <Container justify="flex-start" row>
                  <Bullet />
                  <SubTitle> Endereço de embarque completo</SubTitle>
                </Container>
                <Spacer height={20} />
                <Container justify="flex-start" row>
                  <Bullet destination />
                  <SubTitle> Endereço de destino completo</SubTitle>
                </Container>
              </Container>
              <Button type="dark" compact>
                <ButtonText color="light">Toque para editar</ButtonText>
              </Button>
            </Container>
          )}
        </Container>

        {/* PASSAGEIRO PROCURANDO CORRIDA */}
        {status === 'P' && user.tipo === 'P' && (
          <Container padding={20} zIndex={-1}>
            <PulseCircle
              numPulses={3}
              diameter={400}
              speed={20}
              duration={2000}
            />
          </Container>
        )}

        <Container elevation={50} height={150} color="light">
          {/* PASSAGEIRO SEM CORRIDA */}
          {user.tipo === 'P' && status === 'S' && (
            <Container justify="flex-start" aling="flex-start" padding={20}>
              <SubTitle>Olá, Alisson Fernandes</SubTitle>
              <Title>Para onde você quer ir?</Title>
              <Spacer />
              <Input placeholder="Procure um destino..." />
            </Container>
          )}

          {/* PASSAGEIRO INFORMAÇÕES DA CORRIDA */}
          {user.tipo === 'P' && (status === 'I' || status === 'P') && (
            <Container justify="flex-end" aling="flex-start">
              <Container padding={20}>
                <SubTitle>Driverx Convencional</SubTitle>
                <Spacer />
                <Container row>
                  <Container>
                    <Title>R$ 13,90</Title>
                  </Container>
                  <VerticalSeparator />
                  <Container>
                    <Title>5 mins</Title>
                  </Container>
                </Container>
              </Container>
              <Button type={status === 'P' ? 'muted' : 'primary'}>
                <ButtonText>
                  {status === 'P' ? 'Cancelar Driverx' : 'Chamar Driverx'}
                </ButtonText>
              </Button>
            </Container>
          )}

          {/* PASSAGEIRO EM CORRIDA */}
          {user.tipo === 'P' && status === 'C' && (
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
          {user.tipo === 'M' && status === 'S' && (
            <Container>
              <SubTitle>Olá, João</SubTitle>
              <Title>Nenhuma corrida encontrada.</Title>
            </Container>
          )}

          {/* MOTORISTA ESTÁ EM CORRIDA */}
          {user.tipo === 'M' && status === 'C' && (
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
