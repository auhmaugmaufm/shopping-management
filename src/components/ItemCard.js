import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemCard = ({ name, cost, status, category }) => {
    return (
        <View style={styles.card}>
            <View>
                <Text>{name}</Text>
                <Text>{cost}</Text>
                <Text>{status}</Text>
                <Text>{category}</Text>
            </View>
            <View>
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    CardStyle: {
        

    }
})

export default ItemCard;