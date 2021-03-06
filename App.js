import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import uploadToAnonymousFilesAsync from 'anonymous-files'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImagePickerAsync = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()

    //Check permission
    if(permission.granted === false){
      alert('Please allow access to your camera roll to use the app.')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    
    //Check if image selected
    if(pickerResult.cancelled === true) return    

    //Customize remoteURI for web platform, otherwise use localURI
    if(Platform.OS === 'web'){
      const remoteURI = await uploadToAnonymousFilesAsync(pickerResult.uri)
      setSelectedImage({localURI: pickerResult.uri,  remoteURI})
    } else {
      setSelectedImage({localURI: pickerResult.uri, remoteURI: null })
    }
  }

  const openShareDialogAsync = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert(`Share your image with this link: ${selectedImage.remoteURI}`)
      return
    }

    await Sharing.shareAsync(selectedImage.localURI)
  }

  //Display selected image
  if(selectedImage !== null){
    return (
      <View style={styles.container}>        
        <Image
          source={{uri: selectedImage.localURI}}
          style={styles.thumbnail}
        />     
        <TouchableOpacity
          onPress={() => setSelectedImage(null)}
          style={styles.buttonDelete}        
        >
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>        
      </View>
    )
  }

  return (
    <View style={styles.container}>   
        <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo}/> 
       <Text style={styles.instruction}>Welcome! Start sharing by clicking the button!</Text>  

       <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}        
       >
         <Text style={styles.buttonText}>Pick a photo</Text>
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    margin: 10,
  },
  buttonDelete: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})
