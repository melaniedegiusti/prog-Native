import React, {Component} from 'react'
import {
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    Image
} from 'react-native'
import {auth} from '../firebase/config'
import Register from './Register';

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            error:'',
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
            <Text style={styles.login}>Login</Text>
            <Image 
                style={styles.foto}
                source={require('../../assets/login.png')}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({email: text})}
                placeholder='email'
                keyboardType='email-address'/>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({password: text})}
                placeholder='password'
                keyboardType='email-address'
                secureTextEntry={true}
            />
            <Text style={styles.error}>{this.props.errorMessage}</Text>

            <Text style={{color: 'blue'}} onPress={ <Register />}>
                Google
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                <Text style={styles.textButton}>Ingresar</Text>    
            </TouchableOpacity>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    foto:{
        width: '60%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
    },
    login:{
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
    }

})


export default Login;