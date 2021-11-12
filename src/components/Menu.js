import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import {auth} from '../firebase/config'

const Drawer = createDrawerNavigator()

class Menu extends Component {
    constructor(){
        super();
        this.state ={
            loggedIn: false,
            userData:'',
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
            .then((userData)=> console.log(userData))
            .catch((err)=> console.log(err))
    }

    login(email, password){
         auth.signInWithEmailAndPassword(email, password)
             .then((response)=> {
                console.log("se logueó correctamente");
                console.log(response);
                this.setState({
                    loggedIn: true,
                    userData: response.user
                })
             
            })
             .catch((err)=> console.log(err))
    }

    render(){
        return(
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={()=> <Home />} />
                    <Drawer.Screen name="Login" component={()=> <Login login={(email, pass)=>this.login(email, pass)}/> }/>
                    <Drawer.Screen name="Register" component={()=> <Register register={(email, pass)=> this.register(email, pass) }/> }/>
                    <Drawer.Screen name="Mi Perfil" component={()=><Profile logout={() => this.logout()} />} />
                </Drawer.Navigator>
            
            
        )
    }
}

export default Menu;