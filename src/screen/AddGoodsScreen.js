import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { CustomButtonLong } from "../components/CustomButton";


const AddGoods = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Text>Add Goods ...</Text>
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
    }
})


export default AddGoods;