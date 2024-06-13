import React, { Component } from "react";
import { StyleSheet, View, PanResponder, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Assumindo que você está usando Expo para os ícones
import Svg, { Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class DrawingCanvas extends Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      paths: [],
      currentPath: ""
    };

    this.drawingPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (this.state.isDrawing) {
          this.setState({ currentPath: "" });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (this.state.isDrawing) {
          const { moveX, moveY, x0, y0 } = gestureState;
          const path = this.calculateArrowPath(x0, y0, moveX, moveY);
          this.setState({ currentPath: path });
        }
      },
      onPanResponderRelease: () => {
        if (this.state.isDrawing) {
          this.setState(state => ({
            paths: [...state.paths, state.currentPath],
            currentPath: ""
          }));
        }
      }
    });
  }

  toggleDrawingMode = () => {
    this.setState({ isDrawing: !this.state.isDrawing });
  }

  undoLastPath = () => {
    this.setState(prevState => ({
      paths: prevState.paths.slice(0, -1) // Remove o último caminho da lista
    }));
  }

  calculateArrowPath = (x0, y0, x1, y1) => {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const angle = Math.atan2(dy, dx);
    const arrowLength = 20;
    const arrowAngle = Math.PI / 6;
    const x2 = x1 - arrowLength * Math.cos(angle + arrowAngle);
    const y2 = y1 - arrowLength * Math.sin(angle + arrowAngle);
    const x3 = x1 - arrowLength * Math.cos(angle - arrowAngle);
    const y3 = y1 - arrowLength * Math.sin(angle - arrowAngle);

    return `M${x0},${y0} L${x1},${y1} M${x1},${y1} L${x2},${y2} M${x1},${y1} L${x3},${y3}`;
  }

  render() {
    return (
      <View style={styles.container} {...this.drawingPanResponder.panHandlers}>
        <Svg style={styles.svg}>
          {this.state.paths.map((path, index) => (
            <Path key={index} d={path} stroke="black" strokeWidth="2" fill="none" />
          ))}
          {this.state.isDrawing && (
            <Path d={this.state.currentPath} stroke="black" strokeWidth="2" fill="none" />
          )}
        </Svg>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={this.toggleDrawingMode} style={styles.Pencil}>
            <MaterialIcons name={this.state.isDrawing ? "edit-off" : "edit"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.undoLastPath} style={styles.Undo}>
            <MaterialIcons name="undo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row',
  },
  svg: {
    position: "absolute",
  },
  iconContainer: {
    backgroundColor:'#181C1F',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingVertical: 10,
  },
  Pencil: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  Undo: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
