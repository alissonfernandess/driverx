import Reactotron from 'reactotron-react-native';
import AsyncStorare from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';

// usar o software Reactotron
Reactotron.setAsyncStorageHandler(AsyncStorare)
  .configure()
  .useReactNative()
  .use(reactotronRedux())
  .connect();

console.tron = Reactotron;

export default Reactotron;

/**
 * encaminhando a porta com adb
 * adb reverse tcp:9090 tcp:9090
 */
