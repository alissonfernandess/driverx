import styled from 'styled-components/native';

import theme from './theme.json';

export const Container = styled.View`
  flex: 1;
  background: ${(props) =>
    props.color ? theme.colors[props.color] : 'transparent'};
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content: ${(props) => props.justify || 'center'};
  padding: ${(props) => props.padding || 0}px;
  width: 100%;
  align-items: ${(props) => props.aling || 'center'};
  max-width: ${(props) => props.width || '100%'};
  max-height: ${(props) => (props.height ? props.height + 'px' : 'auto')};
  position: ${(props) => props.position || 'relative'};
  top: ${(props) => props.top || 0};
  z-index: ${(props) => props.zIndex || 1};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: ${(props) => (props.compact ? 5 : 15)}px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background: ${(props) =>
    props.type ? theme.colors[props.type] : theme.colors.primary};
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: ${(props) => (props.color ? theme.colors[props.color] : '#000')};
`;

export const Title = styled.Text`
  text-align: center;
  color: ${(props) => (props.color ? theme.color[props.color] : '#000')};
`;

export const SubTitle = styled.Text`
  font-size: ${(props) => (props.small ? '12px' : '15px')};
  opacity: 0.7;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  color: ${(props) =>
    props.color ? theme.colors[props.color] : theme.colors.dark};
`;

export const PickerButton = styled.TouchableOpacity`
  width: 100%;
  height: 40%;
  margin-top: 2.5%;
  border-width: 3px;
  justify-content: space-around;
  align-items: center;
  border-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.muted50};
  background-color: ${(props) =>
    props.active ? theme.colors.primary + '80' : theme.colors.muted50};
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 7px 15px;
  background-color: ${theme.colors.light};
  border: 1px solid ${theme.colors.muted};
`;

export const Spacer = styled.View`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 10}px;
`;

export const AddressList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding-top: 10;
`;

export const AddressItem = styled.TouchableOpacity`
  padding: 5px 0;
  align-items: flex-start;
`;
