import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import {auth, db} from '../firebase/config'
import Post from '../components/Post';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }
    componentDidMount(){
        this.ownPosts()
    }
    ownPosts() {
        db.collection('posteos')
        .where('user', '==', auth.currentUser.displayName)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            (docs)=>{
                let postsAux= [];
                docs.forEach((doc)=>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    posts: postsAux,
                })
            }
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}> Bienvenido: {auth.currentUser.displayName}</Text>
                <Text style={styles.element}> E-mail: {auth.currentUser.email}</Text>
                <Text style={styles.element}> Usuario creado el: {auth.currentUser.metadata.creationTime}</Text>
                <Text style={styles.element}> Último login: {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.element}> Posts: {this.state.posts.length}</Text>{' '}
                <TouchableOpacity style={styles.touchable} onPress={()=> this.props.logout()}>
                    <Text style={styles.touchableText}>Logout</Text>
                </TouchableOpacity>  
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post)=> post.id.toString()}
                    renderItem={({ item })=> <Post postData={item}> </Post>}
                />
                

            </View>       
        )            
    }

}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10
    },
    welcome:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    element:{
        marginBottom:10,
        textAlign: 'flex-start'
    },
    touchable:{
        backgroundColor:'#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#dc3545'
    },
    touchableText:{
        fontWeight: 'bold',
        color:'white',
        textAlign: 'center'
    }
    
    
});

export default Profile;
