import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Añadir from './Src/Components/AñadirConexion';
import Home from './Src/Components/Home';
import { AppLoading } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Load: false }
    StatusBar.setHidden(true);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ Load: true });
  }

  render() {
    if (this.state.Load) {
      return (<Navigation></Navigation>);
    } else {
      return (<AppLoading></AppLoading>);
    }
  }
}

const Navigation = createStackNavigator({
  Home: { screen: Home, navigationOptions: () => ({ header: null }) },
  Añadir: { screen: Añadir, navigationOptions: () => ({ header: null }) },
})
