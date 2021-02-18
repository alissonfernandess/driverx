import io from 'socket.io-client';

const socket = () => {
  return io('http://10.0.2.2:3333');
};

export default socket;
