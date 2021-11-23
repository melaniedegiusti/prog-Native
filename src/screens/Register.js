import React, {Component} from 'react'
import {
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native'
import {auth} from '../firebase/config'


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            userName:'',
            password:'',
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.register}>Register</Text>
                <TextInput
                    style= {styles.input}
                    keyboardType= 'default'
                    placeholder= 'Username'
                    onChangeText={text => this.setState({ userName: text })}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <Text style={styles.error}>{this.props.errorMessage}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Sign Up</Text>    
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
        backgroundColor:'#339CFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#339CFF'
    },
    textButton:{
        color: '#fff'
    },
    register:{
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
    }

})


export default Register;