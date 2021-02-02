import OAuthManager from 'react-native-social-login';

const socialService = new OAuthManager('Driverx');

socialService.configure({
  facebook: {
    client_id: '1358642924471626',
    client_secret: '51153e8ad66f9341692d0343ec53e1a2',
  },
});

export default socialService;
