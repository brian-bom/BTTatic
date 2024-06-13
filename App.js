import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import DrawingCanvas from './draw';
import Draggable from "./drag";

export default function App() {
  // Define a cor da barra de status
  StatusBar.setBarStyle('light-content'); 

  return (
    <SafeAreaView style={styles.container}>
      <Draggable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C1F',
    paddingHorizontal: 15,
  },
});
