import React , { useState }from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ItemCard = ({ name, cost, status, category, navigation }) => {
    const [title1, setTitle] = useState(name || "")
    const [cost2, setCost] = useState(cost || "")
    const [status3, setStatus] = useState(status || "")


    return (
        <View style={styles.CardStyle}>
            <Text>{name}</Text>
            <Text>{cost} ฿</Text>
            <Text>{status}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    CardStyle: {
        padding: 10,
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'

    }
})

export default ItemCard;