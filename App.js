import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import AppSetting from './components/AppSetting';


export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [plan, setPlan] = useState([]);
  // Frequency
  const [frequency, setFrequency] = useState(5);
  // Interval
  const [duration, setDuration] = useState(5);

  const onCloseSetting = () => {
    setIsModalVisible(false);
  }

  const [backgroundColor, setBackgroundColor] = useState('black');
  const [index, setIndex] = useState(0);
  const [cumulativeTimeout, setCumulativeTimeout] = useState(0);

  useEffect(() => {    
    const changeColor = () => {
      const color = plan[index];
      setBackgroundColor(color);
      console.log(color);
      let timeoutDuration = color === 'black' ?
      (frequency - 3 + Math.random()) * 1000 : 3000;

      setTimeout(() => {
        if (index < plan.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }, timeoutDuration);
      setCumulativeTimeout((prev) => prev + timeoutDuration);
    };

    if (cumulativeTimeout > duration * 60 * 1000) {
      setIsModalVisible(true);
      return;
    }
      if (!isModalVisible) {
        changeColor();
      } else {
        setIndex(0);
      }
  }, [index, plan, frequency, duration]); // Put plan here because it is updated async

  return (
    <Pressable style={{ flex: 1 }} onLongPress={() => setIsModalVisible(true)}
      delayLongPress={2000}>
      <View style={[styles.color_light, { backgroundColor }]}>
        <AppSetting isVisible={isModalVisible} onCloseSetting={onCloseSetting} setPlan={setPlan} setFreq={setFrequency} setDur={setDuration} />
      </View>
      <StatusBar style="auto" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  color_light: {
    flex: 1,
    backgroundColor: '#6AD2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';

// const App = () => {
//   const colors = ['red', 'black', 'green', 'black', 'purple', 'orange', 'black'];
//   const [backgroundColor, setBackgroundColor] = useState('black');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const changeColor = () => {
//       const color = colors[index];
//       setBackgroundColor(color);

//       let timeoutDuration = color === 'black' ? (Math.random() * 2) * 1000 : 3000;
      
//       setTimeout(() => {
//         if (index < colors.length - 1) {
//           setIndex(index + 1);
//         } else {
//           setIndex(0);
//         }
//       }, timeoutDuration);
//     };

//     changeColor();
//   }, [index]);

//   return (
//     <View style={[styles.container, { backgroundColor }]}></View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;
