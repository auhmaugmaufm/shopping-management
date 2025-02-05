import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const TextInputs = ({ width, text, value, onChangeText }) => {
    return (
        <View>
            <TextInput style={[styles.input, { width }]} placeholder={text} value={value} onChangeText={onChangeText}/>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#294cdc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default TextInputs;
