import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const CustomButtonBox = ({ title, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity
        style={[styles.container, { backgroundColor }]}
        onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    )
}

export const CustomButtonLong = ({ title, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#ccc',
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 40,
    },
    button: {
        backgroundColor: 'blue',
        paadding: 10,
        alignItems: 'center',
        justifyContent: 'center' ,
        borderRadius: 5,
        height: 50,
        marginTop: 2,
        width: 300,
    },
})
