import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { CustomButtonLong } from "../components/CustomButton";

const GoodsInput = ({ title, cost, status, category, mode , navigation}) => {
    const [title1, setTitle] = useState(title|| "")
    const [cost2, setCost] = useState(cost || "")
    const [status3, setStatus] = useState(status || "")

    const checkInput = () => {
        if(mode==='add'){
            navigation.navigate("Home")
        }
    }
    return (
        <View style={styles.container}>
            
            <Text>Add Goods ...</Text>
            <TextInput placeholder="Title ..." style={styles.input} value={title1} onChangeText={setTitle}/>
            <TextInput placeholder="Cost ..." style={styles.input} value={cost2} onChangeText={setCost}/>
            <TextInput placeholder="Status ..." style={styles.input} value={status3} onChangeText={setStatus}/>
            <CustomButtonLong
                title={mode==='add' ? 'Add Goods':'Save Change'}
                backgroundColor={mode==='add' ? 'green':'blue'}
                onPress={()=>checkInput()}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
    },
})

export default GoodsInput;