import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ItemCard = ({ name, cost, status, img }) => {
    const color = status === "Bought" ? "#ccc" : "black";
    const backgroundColor = status === "Bought" ? "green" : "orange";

    return (
        <View style={styles.CardStyle}>
            <View style={styles.leftSection}>
                <Image source={{ uri: img }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={[styles.name, { color }]} numberOfLines={1}>
                        {name}
                    </Text>
                    <Text style={[styles.cost, { color }]}>฿ {cost}</Text>
                </View>
            </View>

            <View style={styles.statusContainer}>
                <Text style={[styles.status, { backgroundColor }]}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CardStyle: {
        width: 420,
        height: 120, 
        marginTop: 15,
        borderWidth: 2,
        // borderLeftWidth: 1,
        borderColor: "black",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        //marginLeft: 5,
        borderRadius: 40,
        
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, 
    },
    image: {
        width: 150, 
        height: 119, 
        borderTopLeftRadius: 40, 
        marginRight: 10,
        borderBottomLeftRadius: 40,
        borderColor: 'black',
        borderWidth: 1,

    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    cost: {
        fontSize: 23,
        marginTop: 5,
    },
    statusContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    status: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50, 
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        marginRight: 15
    },
});

export default ItemCard;
