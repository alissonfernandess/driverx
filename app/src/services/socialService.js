import OAuthManager from 'react-native-social-login';

const socialService = new OAuthManager('Driverx');

socialService.configure({
  facebook: {
    client_id: 'SEU_CLIENT_ID',
    client_secret: 'SEU_CLIENT_SECRET',
  },
});

export default socialService;
