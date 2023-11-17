import { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ColorItem({ color, isActive, setActive, style }) {
    const onPress = () => {
        setActive(color);
    }

    return (
        <Pressable onPress={onPress} style={[style, { backgroundColor: color, alignItems: 'center', justifyContent: 'center'}]}>
            {
                isActive(color) ? (<MaterialIcons name="check" size={36} color="black" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }} />) : (<Text></Text>)
            }
        </Pressable>
    );
}

