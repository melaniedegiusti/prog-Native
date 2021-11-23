import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import Comments from '../components/Comments';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false
        }
    }

    componentDidMount() {
        this.recieveLikes();
    }

    recieveLikes() {
        let likes = this.props.postData.data.likes;
        if (likes) {
            this.setState({
                likes: likes.length
            })
        }
        if(likes.includes(auth.currentUser.email)) {    
            this.setState({
                liked: true
            })
        }
    }

    likePost() {
        let post = db.collection("posteos").doc(this.props.postData.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
            console.log('likeado');
        })
        .catch((error) => {
            console.error("Error updating document: ", error); 
        });
    }

    unlikePost() {
        let post = db.collection("posteos").doc(this.props.postData.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes - 1,
                liked: false
            })
            console.log('deslikeado');
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }
    deletePost(){
        db.collection("posteos").doc(this.props.postData.id).delete()
        .then(()=> {
            console.log("eliminado")
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.props.postData.data.email == auth.currentUser.email ? (
                <TouchableOpacity
                    onPress={(id)=>
                        {this.deletePost(this.props.postData.id)}
                    }
                    style={styles.delete}
                > X
                </TouchableOpacity>
                )
                : null
                }
                <Text style={styles.user}> {this.props.postData.data.user} </Text>
                 <Image 
                    style={styles.preview}
                    source={this.props.postData.data.photo}
                /> 
                <Text style={styles.title}> {this.props.postData.data.title} </Text>
                <Text style={styles.desc}> {this.props.postData.data.description} </Text>
                <Text style={styles.likes}> {this.state.likes} Likes</Text>
                
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.button} onPress={() => this.likePost()}>
                            <Text style={styles.textButton}>Like</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={styles.button2} onPress={() => this.unlikePost()}>
                            <Text style={styles.textButton}>Unlike</Text>
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => this.openModal() }>
                    <Text style={styles.comentarios}> Ver comentarios</Text>
                </TouchableOpacity>

                {
                     this.state.showModal ? 
                        <Modal 
                            style={styles.modalContainer}
                            visible={this.state.showModal}
                            animationType="slide"
                            transparent={false}
                        >
                            <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => this.closeModal()} style={styles.closeModal}>
                                <Text>X</Text>
                            </TouchableOpacity>
                            <Comments
                                comments={this.props.postData.data.comments}
                                postId={this.props.postData.id}
                            />
                            </View>
                        </Modal>
                    :
                        null
                        
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#2ECC71",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#2ECC71",
    },
    button2: {
        backgroundColor: '#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#dc3545',
    },
    textButton: {
        color: "#fff",
    },
    modalContainer: {
        border: 'none',
        width: '100%',

    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color: 'black'
    },
    modalView:{
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 4,
    },
    preview: {
        width: '100%',
        height: 500,
        borderRadius: 10,
    },
    delete:{
        fontFamily: 'Arial',
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#dc3545',
        borderRadius: 8,
        margin: 8,
        padding: 4,
        width: '10%',
        alignSelf: 'flex-end',
    },
    user:{
        color: 'black',
        margin: 4,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        margin: 10,
        marginLeft: 15,
        fontSize: 17,
    },
    comentarios: {
        alignSelf: 'flex-start',
        margin: 10,
    },
    title:{
        fontWeight: 'bold',
        margin: 5,
    },
    desc:{

    },
    likes:{
        marginTop: 5,
        marginBottom: 2,
    }
});

export default Post