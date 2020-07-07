import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Navigation from 'app/navigation/index.tsx';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigation);
