import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
// convert?q=USD_PHP&compact=ultra&apiKey=27ec126542f85043b769
import api from '../services/api';

export default class Conversor extends Component{

constructor(props){
    super(props);
    this.state = {
        moedaA: props.moedaA,
        moedaB: props.moedaB,
        moedaB_valor: 0,
        valor_convertido: 0
    };

    this.converter = this.converter.bind(this);
}   

 async converter(){
 let de_para = this.state.moedaA + '_' + this.state.moedaB;    
 const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=27ec126542f85043b769`);
 let cotacao = response.data[de_para];
 let resultado = ( cotacao * parseFloat(this.state.moedaB_valor));

 this.setState({
     valor_convertido: resultado.toFixed(2)
 })
 Keyboard.dismiss();
}
    


render(){
        return(

            <View style={styles.container}>

               <Text style={styles.titulo}> {this.props.moedaA} para {this.props.moedaB} </Text>

               <TextInput 
               placeholder="Valor a ser convertido"
               style={styles.areaInput}
               onChangeText={(moedaB_valor) => this.setState({moedaB_valor})}
               keyboardType="numeric"
               />

               <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
                    <Text style={styles.botaoTexto}> Converter </Text>
               </TouchableOpacity>

               <Text style={styles.valorConvertido}>
                   { (this.state.valor_convertido === 0 ) ? '': this.state.valor_convertido }
               </Text>

            </View>
        );
       }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7B7D79'
    },
    titulo:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#C8E9A0'
    },
    areaInput:{
        width: 280,
        height: 45,
        backgroundColor: '#94B072',
        borderRadius: 15,
        margin: 15,
        textAlign: 'center',
        fontSize: 20,  
    },
    botaoArea:{
        width: 150,
        height: 45,
        backgroundColor:'#94B072',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    botaoTexto:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7B7D79'
    },
    valorConvertido:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#7C965C',
        marginTop: 15
    }
});