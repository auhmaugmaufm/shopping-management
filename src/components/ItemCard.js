import React, { useState } from "react";
import { View, Text, StyleSheet , Image} from "react-native";

const ItemCard = ({ name, cost, status }) => {

    const r = () => {
        if (status === 'Bought') {
            return '#ccc' 
        } else {
            return 'black'
        }
    }

    let color = r()

    return (
        <View style={[styles.CardStyle]}>
            <View style={{flexDirection: 'row' }}>
                <View style={styles.box}>
                    <Image
                        source={require('../img/IMG_3324.jpg')}
                        style={styles.box}
                    />
                </View>
                <View style={{padding: 10}}>
                    <Text style={[styles.name, {color}]}>{name}</Text>
                    <Text style={{color}}>{status}</Text>
                </View>

            </View>

            <View>
                <Text style={[styles.cost, {color}]}>{cost} ฿</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    CardStyle: {
        flex: 1,
        width: 408,
        height: 70,
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    cost: {
        padding: 10,
        fontSize: 25
    },
    box: {
        width: 120,
        height: 70,
        borderTopRightRadius: 25,
    }


})

export default ItemCard;