import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const CustomButtonBox = ({ title, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity
        style={[styles.ButtonBox, { backgroundColor }]}
        onPress={onPress}>
        <View style={{flex: 1, justifyContent: 'center' ,alignItems: 'center'}}>
            <Text style={styles.TextBox}>{title}</Text>
        </View>
        
    </TouchableOpacity>
    )
}

export const CustomButtonLong = ({ title, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity
            style={[styles.ButtonLong, { backgroundColor }]}
            onPress={onPress}>
            <Text style={styles.TextLong}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ButtonBox: {
        width: 85,
        height: 60,
        borderRadius: 50,
    },
    TextBox: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    TextLong: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    ButtonLong: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center' ,
        borderRadius: 50,
        height: 50,
        marginTop: 15,
        width: 300,
    },
    ButtonSmall: {
        borderWidth: 1,
        borderColor: '#294cdc',
        width: 30,
        height: 30,
        borderRadius: 5,
    }
})
