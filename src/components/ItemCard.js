import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemCard = ({ name, cost, status, category }) => {
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