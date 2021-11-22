import React, {Component} from 'react';
import { db } from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import Post from '../components/Post'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {   
            posts: []
        }
    }

    componentDidMount() {
        this.showPost();
    }

    showPost() {
        db.collection('posteos').orderBy('createdAt', 'desc').onSnapshot((docs) => {
            let posteos = []
            docs.forEach((doc) => {
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
    deletePost(param){
        db.collection('posts')
          .where('createdAt', '==', param)
          .get()
          .then(data=> {
            data.forEach(doc=> doc.ref.delete());
            const postsFiltered = this.state.posts.filter(
              post=> post.createdAt != param
            );
            this.setState({ posts: postsFiltered });
          });
      }

    
    render(){
        return(
            <View style={styles.container}>
                <Text> Home </Text>
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <Post postData={item} deletePost={createdAt=> this.deletePost(createdAt)}/>}
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