import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MySlider from './MySlider';
import ColorItem from './ColorItem';
import { useState } from 'react';


export default function AppSetting({ isVisible, onCloseSetting, setPlan, setFreq, setDur }) {
    // Frequency
    const [frequency, setFrequency] = useState(3);
    // Interval
    const [duration, setDuration] = useState(5);
    // Colors
    const [colors, setColors] = useState([]);

    const isActive = (color) => {
        return colors.includes(color);
    }

    const toggleActive = (color) => {
        if (isActive(color)) {
            const newColors = colors.filter(item => item !== color);
            setColors(newColors);
        } else {
            const newColors = [...colors, color];
            setColors(newColors);
        }
    }

    const onClose = () => {
        // Compute plan
        setFreq(frequency);
        setDur(duration);

        let N = Math.floor(duration * 60 / frequency) + 5; // Add some buffer

        let resultArray = ["black"];
        for (let i = 0; i < N; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            resultArray.push(randomColor);
            resultArray.push("black");
        }
        setPlan(resultArray);
        console.log("Plan: ", resultArray);

        // Close modal
        onCloseSetting();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Settings</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="check" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.settingContainer}>
                    <MySlider title="Frequency in seconds: " min_val={5} max_val={10} default_val={5} onSlidingComplete={setFrequency} style={styles.slider} />
                    <MySlider title="Exercise duration in minutes: " min_val={1} max_val={15} default_val={5} onSlidingComplete={setDuration} style={styles.slider} />
                    <View style={styles.colorSelector}>
                        <ColorItem color="red" style={styles.box} isActive={isActive} setActive={toggleActive} />
                        <ColorItem color="cyan" style={styles.box} isActive={isActive} setActive={toggleActive} />
                        <ColorItem color="yellow" style={styles.box} isActive={isActive} setActive={toggleActive} />
                        <ColorItem color="chartreuse" style={styles.box} isActive={isActive} setActive={toggleActive} />
                        <ColorItem color="fuchsia" style={styles.box} isActive={isActive} setActive={toggleActive} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '61.3%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '10%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingContainer: {
        height: "50%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    colorSelector: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    slider: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    box: {
        height: 80,
        width: 60,
    },
});
