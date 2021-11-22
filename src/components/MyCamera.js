import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet} from "react-native";
import { Camera } from "expo-camera";
import {storage} from '../firebase/config'

class MyCamera extends Component{
    constructor(props) {
        super(props)
        this.state = {
            permission: false,
            photo: "",
        }
        this.camera;
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=> {
                this.setState({
                    permission: true,
                })
            })
            .catch((err)=> console.log(err))
        Camera.getAvailableCameraTypesAsync()
            .then((res)=> (console.log(res)))
    }

    shoot() {
        this.camera
          .takePictureAsync()
          .then((photo) => {
            //console.log(photo);
            this.setState({
              photo: photo.uri,
            });
          })
          .catch((err) => console.log(err));
      }

    savePhoto(){
        //console.log("guardar foto en firebase")
        fetch(this.state.photo)
            .then((res)=> res.blob())
                .then((image)=>{
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);

                    ref.put(image)
                        .then(()=> {
                            ref.getDownloadURL()
                                .then((url)=> {
                                    this.props.onImageUpload(url)
                                    this.setState({
                                        photo: ""
                                    })
                                });
                        })
                })
            .catch((err)=>console.log(err))
    }
    rejectPhoto(){
        this.setState({
            photo: ''
        })
    }

    render(){
        return (
            <>
            {this.state.photo ? (
                <>
                    <Image 
                        style={{flex:1, width: "100%"}}
                        source={{uri: this.state.photo}}
                    />
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.accept} onPress={()=> this.savePhoto()}>
                            <Text style={styles.text}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reject} onPress={()=> this.rejectPhoto()}>
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ): (
                <>
                    <Camera 
                    style={{flex:1, width: "100%"}}
                    type= {Camera.Constants.Type.front}
                    ref={(cam)=>(this.camera = cam)}
                />
                <TouchableOpacity onPress={() => this.shoot()}>
                    <Text style={styles.shoot}> Shoot </Text>
                </TouchableOpacity>
                </>

            )} 
            </>
        )
    }
}
const styles = StyleSheet.create({
    shoot:{
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        margin: 20,
    },
    accept: {
        width: 100,
        height: 50,
        backgroundColor: "#28a745",
        borderRadius: 50,
        // margin: 10,
    },
    reject: {
        width: 100,
        height: 50,
        backgroundColor: '#FF392B',
        borderRadius: 50,
        // margin: 10,
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    btnContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },

})

export default MyCamera;
