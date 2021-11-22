import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";


class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            comment: '',
        };
    }

    onComment(){
        const post = db.collection("posteos").doc(this.props.postData.id);
        if(this.state.comment == ''){
            alert('Por favor, escribí un comentario.')
        } else {
            post.update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    id: Date.now(),
                    email: auth.currentUser.email,
                    // owner: auth.currentUser.displayName,
                    comment: this.state.comment,
                }),
            })
            .then(()=>{
                this.setState({
                    comment: '',
                });
            });
        }
    }

    render(){
        return(
            <View>
                {this.props.comments.length != 0 ? (
                    <FlatList
                    data={this.props.comments}
                    keyExtractor={(comment)=> comment.id}
                    renderItem={({ item })=>(
                        <>
                        <Text>
                            {item.email}: {item.comment}
                        </Text>
                        </>
                    )}
                    />
                ) : (
                <Text >Aún no hay comentarios. Sé el primero!</Text>
                )}

                <TextInput
                keyboardType="default"
                placeholder="Comentá!"
                multiline={true}
                numberOfLines={1}
                onChangeText={(text) => this.setState({ comment: text })}
                value={this.state.comment}
                style={styles.placeholder}
                />
                <TouchableOpacity style={styles.post} onPress={() => this.onComment()}>
                    <Text style={styles.post2}>Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
    },

    post:{
        backgroundColor: "#2ECC71",
        padding: 4,
        margin: 2,
        borderRadius: 4,
    },
    post2:{
        color: 'white',
        padding: 4,
        margin: 2,
        borderRadius: 4,
    },

    placeholder:{
        shadowColor: "#ccc",
        margin: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        padding: 4,
        
    },
    
});

export default Comments;
