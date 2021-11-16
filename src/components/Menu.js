import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import NewPostForm from '../screens/NewPostForm';
import {auth} from '../firebase/config'

const Drawer = createDrawerNavigator()

class Menu extends Component {
    constructor(){
        super();
        this.state ={
            loggedIn: false,
            errorMessage:'',
            errorCode:'',
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user !== null) {
                this.setState({
                    loggedIn: true,
                })
            } else {
                this.setState({
                    loggedIn: false,
                })
            }
        })
    }

    register(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then( () => {
            console.log('========= Registrado ============');
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code
            })
        })
}

    login(email, password){
         auth.signInWithEmailAndPassword(email, password)
         .then( (response)=>{
            console.log('========= Logueado ============');
            console.log(response);
            this.setState({
                loggedIn: true,
                userData: response.user,
            })
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorMessage:error.message,
                errorCode: error.code
            })
        })
}    

      logout(){
          auth.signOut()
    }

    render(){
        return(
                this.state.loggedIn == false ? 
                    <Drawer.Navigator>
                        <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />} />
                        <Drawer.Screen name="Register" component={()=><Register register={(email, pass)=>this.register(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />} />
                    </Drawer.Navigator>
                 :
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={()=><Home />} />  
                        <Drawer.Screen name="Nuevo Post" component={() => <NewPostForm />}  />                    
                        <Drawer.Screen name="Mi Perfil" component={()=><Profile logout={() => this.logout()} />} />
                    </Drawer.Navigator>
        )
    }
}

export default Menu;