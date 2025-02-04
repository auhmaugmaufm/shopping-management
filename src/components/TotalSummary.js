import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalSummary = ({total}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Total Summary : </Text>
            <Text style={styles.total}>{total} ฿</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        height : 80,
        width: 330,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    head: {
        fontSize: 18,
        color: '#616161'
    },
    total: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default TotalSummary;