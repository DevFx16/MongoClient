import React from 'react';
import { Container, Body, Right, Title, Header, Icon, Button, Text, Left, Content, Card, CardItem } from 'native-base'
import Estilos from '../Styles/Style';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class AñadirConexion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header style={Estilos.Header}>
                    <Left />
                    <Body>
                        <Title>Conexiones</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={() => { this.props.navigation.push('Añadir') }}>
                            <Text>Añadir</Text>
                            <Icon name='plus-network' type='MaterialCommunityIcons'></Icon>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={[Estilos.Content]}>
                    <SimpleAnimation delay={500} duration={1500} direction='left' movementType='slide' staticType='bounce'>
                        <Card>
                            <CardItem header>
                                <Text>Establecidas</Text>
                            </CardItem>
                            {
                                ['', '', '', '', '', '', ''].map(Item => {
                                    return (
                                        <CardItem>
                                            <Left>
                                                <Icon active name='lan-connect' type='MaterialCommunityIcons' style={Estilos.Color} />
                                            </Left>
                                            <Body>
                                                <Text>Google Plus</Text>
                                            </Body>
                                            <Right>
                                                <Icon active name='hand-o-right' type='FontAwesome' style={Estilos.Color} />
                                            </Right>
                                        </CardItem>
                                    );
                                })
                            }
                        </Card>
                    </SimpleAnimation>
                </Content>
            </Container>
        );
    }

}