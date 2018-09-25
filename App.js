import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Añadir from './Src/Components/AñadirConexion';
import Estilos from './Src/Styles/Style';
import { View, Spinner } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Load: false }
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
      return (
        <View style={[Estilos.Content, Estilos.CenterFlex]}>
          <Spinner color='violet' size='large'></Spinner>
        </View>
      )
    }
  }
}

const Navigation = createStackNavigator({
  Añadir: { screen: Añadir, navigationOptions: () => ({ header: null }) },
})
