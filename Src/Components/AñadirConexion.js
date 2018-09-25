import React from 'react';
import { Image } from 'react-native';
import { Container, H3 } from 'native-base'
import Estilos from '../Styles/Style';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class AñadirConexion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SimpleAnimation delay={500} duration={1500} direction='left' movementType='slide' staticType='bounce'>
                <Container style={[Estilos.Content, Estilos.CenterFlex]}>
                    <Grid>
                        <Col size={2}>

                        </Col>
                        <Col size={2}>
                            <H3>Hola Mundo</H3>
                        </Col>
                    </Grid>
                </Container>
            </SimpleAnimation>
        );
    }

}