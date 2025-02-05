import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TextInput } from "react-native";
import { CustomButtonLong } from "../components/CustomButton";


const AddGoods = ({ navigation }) => {
    //const [isVisible, setIsVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Text>Add Goods ...</Text>
            <TextInput placeholder="Title ..." style={styles.input} />
            <TextInput placeholder="Cost ..." style={styles.input} />
            <TextInput placeholder="Category ..." style={styles.input} />
            <CustomButtonLong
                title='Add Goooooods'
                backgroundColor='green'
                onPress={() => navigation.navigate("Home")}
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
        marginTop: 15,
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


export default AddGoods;