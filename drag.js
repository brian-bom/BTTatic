import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Dimensions, TouchableOpacity, Text } from "react-native";
import DrawingCanvas from './draw';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SMALL_CIRCLE_RADIUS = 15;
const LARGE_CIRCLE_RADIUS = 25;
const BOTTOM_HEIGHT = 80;
const SPACING = 10; // Espaçamento entre as bolas

export default class Draggable extends Component {
  constructor() {
    super();
    this.initialPositions = {
      pan1: { x: screenWidth / 2 - SMALL_CIRCLE_RADIUS * 6 - SPACING * 2, y: screenHeight - 105 - SMALL_CIRCLE_RADIUS * 2 },
      pan2: { x: screenWidth / 2 - SMALL_CIRCLE_RADIUS * 3 - SPACING, y: screenHeight - 115 - SMALL_CIRCLE_RADIUS * 2 },
      pan3: { x: screenWidth / 2, y: screenHeight - 115 - SMALL_CIRCLE_RADIUS * 2 },
      pan4: { x: screenWidth / 2 + SMALL_CIRCLE_RADIUS * 3 + SPACING, y: screenHeight - 115 - SMALL_CIRCLE_RADIUS * 2 },
      pan5: { x: screenWidth / 2 + SMALL_CIRCLE_RADIUS * 6 + SPACING * 2, y: screenHeight - 115 - SMALL_CIRCLE_RADIUS * 2 }
    };
    this.state = {
      pan1: new Animated.ValueXY(this.initialPositions.pan1),
      pan2: new Animated.ValueXY(this.initialPositions.pan2),
      pan3: new Animated.ValueXY(this.initialPositions.pan3),
      pan4: new Animated.ValueXY(this.initialPositions.pan4),
      pan5: new Animated.ValueXY(this.initialPositions.pan5)
    };
  }

  componentWillMount() {
    this._val1 = { x: 0, y: 0 };
    this._val2 = { x: 0, y: 0 };
    this._val3 = { x: 0, y: 0 };
    this._val4 = { x: 0, y: 0 };
    this._val5 = { x: 0, y: 0 };

    this.state.pan1.addListener((value) => this._val1 = value);
    this.state.pan2.addListener((value) => this._val2 = value);
    this.state.pan3.addListener((value) => this._val3 = value);
    this.state.pan4.addListener((value) => this._val4 = value);
    this.state.pan5.addListener((value) => this._val5 = value);

    this.panResponder1 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan1.setOffset({
          x: this.state.pan1.x._value,
          y: this.state.pan1.y._value
        });
        this.state.pan1.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan1.x, dy: this.state.pan1.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan1.flattenOffset();
      }
    });

    this.panResponder2 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan2.setOffset({
          x: this.state.pan2.x._value,
          y: this.state.pan2.y._value
        });
        this.state.pan2.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan2.x, dy: this.state.pan2.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan2.flattenOffset();
      }
    });

    this.panResponder3 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan3.setOffset({
          x: this.state.pan3.x._value,
          y: this.state.pan3.y._value
        });
        this.state.pan3.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan3.x, dy: this.state.pan3.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan3.flattenOffset();
      }
    });

    this.panResponder4 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan4.setOffset({
          x: this.state.pan4.x._value,
          y: this.state.pan4.y._value
        });
        this.state.pan4.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan4.x, dy: this.state.pan4.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan4.flattenOffset();
      }
    });

    this.panResponder5 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan5.setOffset({
          x: this.state.pan5.x._value,
          y: this.state.pan5.y._value
        });
        this.state.pan5.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan5.x, dy: this.state.pan5.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        this.state.pan5.flattenOffset();
      }
    });
  }

  resetPositions = () => {
    Animated.timing(this.state.pan1, {
      toValue: this.initialPositions.pan1,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(this.state.pan2, {
      toValue: this.initialPositions.pan2,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(this.state.pan3, {
      toValue: this.initialPositions.pan3,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(this.state.pan4, {
      toValue: this.initialPositions.pan4,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(this.state.pan5, {
      toValue: this.initialPositions.pan5,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  render() {

    const quadraHeight = screenHeight - BOTTOM_HEIGHT; // Altura disponível para a quadra
    const middleLineTop = (quadraHeight - 55) / 2;

    const panStyle1 = {
      transform: this.state.pan1.getTranslateTransform(),
      zIndex: 1, // Coloca a bola acima do componente bottom
    };
    const panStyle2 = {
      transform: this.state.pan2.getTranslateTransform(),
      zIndex: 1, // Coloca a bola acima do componente bottom
    };
    const panStyle3 = {
      transform: this.state.pan3.getTranslateTransform(),
      zIndex: 1, // Coloca a bola acima do componente bottom
    };
    const panStyle4 = {
      transform: this.state.pan4.getTranslateTransform(),
      zIndex: 1, // Coloca a bola acima do componente bottom
    };
    const panStyle5 = {
      transform: this.state.pan5.getTranslateTransform(),
      zIndex: 1, // Coloca a bola acima do componente bottom
    };

    return (
        <View style={[styles.quadra, { height: quadraHeight }]}>
          <View style={[styles.line, { top: middleLineTop }]}/>
          <Animated.View
            {...this.panResponder1.panHandlers}
            style={[panStyle1, styles.smallCircle, styles.greenCircle]}
          />
          <Animated.View
            {...this.panResponder2.panHandlers}
            style={[panStyle2, styles.largeCircle, styles.blueCircle]}
          />
          <Animated.View
            {...this.panResponder3.panHandlers}
            style={[panStyle3, styles.largeCircle, styles.blueCircle]}
          />
          <Animated.View
            {...this.panResponder4.panHandlers}
            style={[panStyle4, styles.largeCircle, styles.redCircle]}
          />
          <Animated.View
            {...this.panResponder5.panHandlers}
            style={[panStyle5, styles.largeCircle, styles.redCircle]}
          />

          <DrawingCanvas/>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={this.resetPositions} style={styles.button}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    backgroundColor: "#F5DEB3",
    justifyContent: "center",
    alignItems: "center",
  },
  quadra: {
    width: '100%',
    backgroundColor: "#F5DEB3",
  },
  line: {
    position: "absolute",
    backgroundColor: "black",
    height: 5,
    width: screenWidth
  },
  smallCircle: {
    width: SMALL_CIRCLE_RADIUS * 2,
    height: SMALL_CIRCLE_RADIUS * 2,
    borderRadius: SMALL_CIRCLE_RADIUS,
    position: "absolute"
  },
  largeCircle: {
    width: LARGE_CIRCLE_RADIUS * 2,
    height: LARGE_CIRCLE_RADIUS * 2,
    borderRadius: LARGE_CIRCLE_RADIUS,
    position: "absolute"
  },
  greenCircle: {
    backgroundColor: "lime",
  },
  blueCircle: {
    backgroundColor: "blue",
  },
  redCircle: {
    backgroundColor: "red",
  },
  bottom: {
    height: BOTTOM_HEIGHT,
    backgroundColor: "#181C1F", 
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    justifyContent: 'center',
  
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    width: 75,
    height: 35,
    
  },
  buttonText: {
    color: '#000000',
    fontSize: 13,
    textAlign: 'center'
  }
});
