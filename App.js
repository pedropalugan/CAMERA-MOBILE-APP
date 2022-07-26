import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';


export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null)

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
    })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <Camera 
      style={{flex:1, }}
      type={type}
      />
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
