import React, { useState, useRef, useEffect } from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, Image, Modal, StyleSheet} from 'react-native'
import { Camera } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'


export default function Picture(){
  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>Acesso negado!!!</Text>
  }

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
      setOpen(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 20,
            left: 20
          }}
            onPress={() => setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )}>
            <Text style={{ color: "#FFF", fontSize: 20, marginBottom: 13 }}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        margin: 20,
        borderRadius: 10,
        height: 50,
      }} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal 
        animationType='slide'
        trasparent={false}
        visible={open}
        >
          <View style={{
            flex:1, justifyContent:"center", alignItems: 'center', margin:20
          }}>

          <TouchableOpacity style={{margin:10}} onPress={ () => setOpen(false)}>
            <FontAwesome name='window-close' size={50} color="#FF0000"/>
          </TouchableOpacity>
            <Image style={{width: '100%', height:300, borderRadius: 10}}
            source={{uri: capturedPhoto}}
            />
          </View>
        </Modal>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });