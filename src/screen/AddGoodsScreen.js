import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import TextInputs from "../components/TextInput";

import { CustomButtonLong } from "../components/CustomButton";

const AddGoods = ({ title, cost, status, mode, navigation }) => {
    const [title1, setTitle] = useState(title || "")
    const [cost2, setCost] = useState(cost || "")
    const [status3, setStatus] = useState(status || "")


    const state = () => {
        if(mode==='add'){
            return true
        }else{
            return false
        }
    }

    let m = state()

    return (
        <View style={styles.container}>
            <TextInputs text="Title ..." width= {300} value={title1} onChangeText={setTitle} />
            <TextInputs text="Cost ..."  width= {300} value={cost2} onChangeText={setCost} />
            <TextInputs text="Status ..."  width= {300} value={status3} onChangeText={setStatus} />
            <CustomButtonLong
                title={m ? 'Add Goods' : 'Save Change'}
                backgroundColor={m ? 'green' : 'blue'}
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})

export default AddGoods;
