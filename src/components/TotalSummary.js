import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalSummary = ({total}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Total Summary (unpurchased): </Text>
            <Text style={styles.total}>{total} ฿</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        height : 60,
        width: 240,
        borderColor: '#294cdc',
        borderRadius: 5,
        padding: 8,
        backgroundColor: 'white'
    },
    head: {
        fontSize: 12,
        color: '#616161'
    },
    total: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right'
    }
})

export default TotalSummary;