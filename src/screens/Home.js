import React, {Component} from 'react'
import{Text, View, StyleSheet, FlatList} from 'react-native'
import { db } from '../firebase/config'

class Home extends Component{
    constructor(props){
        super(props);
        this.State ={
            posts:[]
        }
    }

    componentDidMount(){
        this.showPost();
    }

    showPost(){
        db.collection('posteos').onSnapshot((docs)=>{
            console.log(docs)
            let posteos = []
            docs.forEach((doc)=> {
                console.log(doc.data())
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posteos
            })
        })
    }

    render(){
        return(
            <View style={StyleSheet.container}>
                <FlatList 
                    // data = {this.state.posts}
                    // keyExtractor = {(post) => post.id}
                    // renderItem = {({item}) => <Post postData={item} />}
                />
            </View>
            
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
    },
    image:{
        height:250,
    },
    flatList:{
        justifyContent:'space-between'
    },
    touchable:{
        padding: 4,
        backgroundColor: '#ccc',
        marginBottom: 10,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold'
    }
});

export default Home;