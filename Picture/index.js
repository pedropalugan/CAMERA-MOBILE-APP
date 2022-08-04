import React, { useState, useRef, useEffect } from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, Image, Modal, StyleSheet, Share} from 'react-native'
import { Camera } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'; 


export default function Picture(){
  const camRef = useRef(null)
  const [boltColor, setBoltcolor] = useState('#FFF')
  const [backColor, setBackcolor] = useState('#000')
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const [flashType, setFlashType] = useState('OFF')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(flash === 1){
      setFlashType("ON")
      setBoltcolor("#000")
      setBackcolor("#FFF")
    }
    else if (flash === 0){
      setFlashType("OFF")
      setBoltcolor("#FFF")
      setBackcolor("#000")
    }
  }, [flash])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(() => {
      alert("Foto salva com sucesso!!!")
    })
    .catch(error => console.log(error))
  }

    const onShare = async () => {
    await Sharing.shareAsync(capturedPhoto) 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
        flashMode={flash}
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

          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 25,
            left: 150,
            borderRadius: '50%',
            width: 40,
            backgroundColor:backColor,
            height: 40,
            alignItems: 'center',}}
            onPress={() => setFlash(
              flash === Camera.Constants.FlashMode.off
              ? Camera.Constants.FlashMode.on 
              : Camera.Constants.FlashMode.off 
            )}
            >
          <FontAwesome name='bolt' size={23} color={boltColor} style={{marginTop: '20%'}}/>
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
            flex:1, justifyContent:"center", alignItems: 'center'
          }}>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 100, marginBottom: 40, justifyContent: 'space-between', alignContent: 'center', width: '50%'}}>
          <TouchableOpacity onPress={ savePicture } style={{}}>
            <FontAwesome name='upload' size={50} color="#121212"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={ onShare }>
            <FontAwesome name='share' size={50} color="#121212"/>
          </TouchableOpacity>
          </View>

          </View>
            <Image style={{width: '100%', height:450, borderRadius: 10}}
            source={{uri: capturedPhoto}}
            />

        <View style={{
            flex:1, justifyContent:"center", alignItems: 'center'
          }}>
          <TouchableOpacity onPress={() => setOpen(false)}>
            <FontAwesome name='window-close' size={50} color="#FF0000"/>
          </TouchableOpacity>

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
