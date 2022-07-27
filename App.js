import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';


export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back); //It orders what camera to be turned on -> BACK or FRONT
  const [hasPermission, setHaspermission] = useState(null) // It asks to the user if it is allowed to use the camera

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === 'granted')
    })
  }, [])

  if(hasPermission === null){
    return <View />
  }

  if(hasPermission === 'false'){
    return<Text>Não foi possível acessar a câmera</Text>
  }


  return (
    <SafeAreaView style={styles.container}>
      <Camera 
      style={{flex:1, }}
      type={type}
      >
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
