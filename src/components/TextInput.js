import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const TextInputs = ({ width, text, value, onChangeText, keyboardType }) => {
    return (
        <View>
            <TextInput style={[styles.input, { width }]} placeholderTextColor="white" placeholder={text} value={value} onChangeText={onChangeText} keyboardType={keyboardType}/>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        // borderWidth: 1,
        // borderColor: 'black',
        borderRadius: 50,
        padding: 10,
        fontSize: 18,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#928181',
        maxHeight: 50,
        color: 'white',
    }
});

export default TextInputs;
