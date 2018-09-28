import React from 'react';
import { Image } from 'react-native';
import { Container, Text, Form, Item, Input, Button, Picker, Content, Icon, ListItem, Body, CheckBox } from 'native-base'
import Estilos from '../Styles/Style';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class AñadirConexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Picker: { Error: false, Valor: '0' },
            Url: { Error: false, Valor: '' },
            Database: { Error: false, Valor: '' },
            Puerto: { Error: false, Valor: '' },
            Servidor: { Error: false, Valor: '' },
            Usuario: { Error: false, Valor: '' },
            Password: { Error: false, Valor: '' },
            Estado: '0',
            Check: false
        }
    }

    PickerValor(Texto) {
        Texto == '0' ? this.setState({ Picker: { Error: true, Valor: '0' }, Estado: '0' }) : this.setState({ Picker: { Error: false, Valor: Texto }, Estado: Texto });
    }

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={[Estilos.Content, Estilos.CenterFlex]}>
                    <SimpleAnimation delay={500} duration={1500} direction='left' movementType='slide' staticType='bounce'>
                        <Grid>
                            <Row size={1}>
                                <Image source={{ uri: 'https://gcollazo.github.io/mongodbapp/assets/img/icon.png' }} resizeMode='contain' style={Estilos.Imagen} />
                            </Row>
                            <Row size={3}>
                                <Form>
                                    <Item error={this.state.Picker.Error} last>
                                        <Picker note mode='dropdown' style={Estilos.Picker} selectedValue={this.state.Picker.Valor} onValueChange={this.PickerValor.bind(this)}>
                                            <Picker.Item label='Seleccione el metodo de conexión' value='0' />
                                            <Picker.Item label='Url' value='1' />
                                            <Picker.Item label='Rellenando los datos' value='2' />
                                        </Picker>
                                    </Item>
                                    <ListItem itemHeader frist>
                                        <Text>URL</Text>
                                    </ListItem>
                                    <Item last error={this.state.Url.Error && this.state.Estado == '1'} disabled={this.state.Estado != '1'} >
                                        <Icon active name='database' type='MaterialCommunityIcons' />
                                        <Input placeholder='Url MongoDb' disabled={this.state.Estado != '1'} onChangeText={(Texto) => this.setState({ Url: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Url.Error && this.state.Estado == '1' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <ListItem itemHeader>
                                        <Text>RELLENANDO CAMPOS</Text>
                                    </ListItem>
                                    <Item last error={this.state.Database.Error && this.state.Estado == '2'} disabled={this.state.Estado != '2'} >
                                        <Icon active name='database' type='MaterialCommunityIcons' />
                                        <Input placeholder='Nombre base datos' disabled={this.state.Estado != '2'} onChangeText={(Texto) => this.setState({ Database: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Database.Error && this.state.Estado == '2' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <Item last error={this.state.Servidor.Error && this.state.Estado == '2'} disabled={this.state.Estado != '2'}>
                                        <Icon active name='server' type='MaterialCommunityIcons' />
                                        <Input placeholder='Host' disabled={this.state.Estado != '2'} onChangeText={(Texto) => this.setState({ Servidor: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Servidor.Error && this.state.Estado == '2' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <Item last error={this.state.Puerto.Error && this.state.Estado == '2'} disabled={this.state.Estado != '2'}>
                                        <Icon active name='server' type='MaterialCommunityIcons' />
                                        <Input placeholder='Puerto' disabled={this.state.Estado != '2'} onChangeText={(Texto) => this.setState({ Puerto: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Puerto.Error && this.state.Estado == '2' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <ListItem disabled={this.state.Estado != '2'}>
                                        <CheckBox checked={this.state.Check} color='green' onPress={() => { this.setState({ Check: this.state.Check ? false : true }) }} disabled={this.state.Estado != '2'} />
                                        <Body>
                                            <Text>Autenticación</Text>
                                        </Body>
                                    </ListItem>
                                    <Item last error={this.state.Usuario.Error && this.state.Check} disabled={!this.state.Check}>
                                        <Icon active name='user' type='FontAwesome' />
                                        <Input placeholder='Usuario' disabled={!this.state.Check} onChangeText={(Texto) => this.setState({ Usuario: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Usuario.Error && this.state.Estado == '2' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <Item last error={this.state.Password.Error && this.state.Check} disabled={!this.state.Check}>
                                        <Icon active name='textbox-password' type='MaterialCommunityIcons' />
                                        <Input placeholder='Contraseña' disabled={!this.state.Check} onChangeText={(Texto) => this.setState({ Password: { Error: Texto.length <= 0 ? true : false, Valor: Texto } })} />
                                        {this.state.Password.Error && this.state.Estado == '2' ? <Icon name='close-circle' /> : null}
                                    </Item>
                                    <Button block success style={Estilos.Margen} iconLeft>
                                        <Icon active name='lan-connect' type='MaterialCommunityIcons' />
                                        <Text>Conectar</Text>
                                    </Button>
                                    <Button block transparent style={Estilos.Margen} onPress={() => {this.props.navigation.navigate('Home')}}>
                                        <Text>Cancelar</Text>
                                    </Button>
                                </Form>
                            </Row>
                        </Grid>
                    </SimpleAnimation>
                </Content>
            </Container>
        );
    }
}