import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { Camera } from "expo-camera";


class MyCamera extends Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render(){
        return (
            <>
                < Camera 
                    style={{flex:1, width: "100%"}}
                    type= {Camera.Constants.Type.front}
                />
                <TouchableOpacity>
                    <Text> Shoot </Text>
                </TouchableOpacity>
            </>
        )
    }
}

export default MyCamera;
