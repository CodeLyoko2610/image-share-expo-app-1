import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>   
        <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo}/> 
       <Text style={styles.instruction}>To share a photo from your phone with a friend, just press the button below!</Text>  

       <TouchableOpacity
        onPress={() => alert('Hello World!')}
        style={styles.button}        
       >
         <Text style={styles.buttonText}>Pick a photo</Text>
       </TouchableOpacity>
    </View>
  );
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
  }
});
