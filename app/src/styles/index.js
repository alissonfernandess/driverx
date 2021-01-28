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
