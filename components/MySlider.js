import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function MySlider({ title, min_val, max_val, default_val, onSlidingComplete }) {
    const [val, setVal] = useState(default_val);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title} ({min_val} to {max_val}): {val}</Text>
            <Slider
                style={styles.slider}
                minimumValue={min_val}
                maximumValue={max_val}
                value={default_val}
                onSlidingComplete={(value) => {onSlidingComplete(Math.round(value))}}
                onValueChange={(value) => {setVal(Math.round(value))}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    slider: {
        width: "100%",
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    }
});
