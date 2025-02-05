import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { CustomButtonBox } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";


const HomeScreen = ({ navigation }) => {
    const [goods, setGoods] = useState([
        { id: '1', title: 'Shoes', cost: 200, category: 'Fashion', status: '1' },
        { id: '2', title: 'Shoe1', cost: 200, category: 'Fashion', status: '1' },
        { id: '3', title: 'Shoes2', cost: 200, category: 'Fashion', status: '1' },
        { id: '4', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '5', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '6', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '7', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '8', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '9', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '10', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '11', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },
        { id: '12', title: 'Shoes3', cost: 200, category: 'Fashion', status: '1' },

    ])



    return (
        <View style={styles.ViewStyle}>
            <TextInput placeholder="Search a name of goods ..." style={styles.input} />

            <View style={styles.AllGoods}>
                <FlatList
                    data={goods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("AddGoods", { mode: false })}>
                                <ItemCard
                                    name={item.title}
                                    cost={item.cost}
                                    status={item.status}
                                    navigation={navigation}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={styles.container}>
                <View>
                    <TotalSummary />
                </View>
                <View>
                    <CustomButtonBox
                        title='+'
                        backgroundColor='#72d572'
                        onPress={() => navigation.navigate("AddGoods", { mode: true })
                        }
                    />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        width: 420,
        alignItems: 'center',
    },
    AllGoods: {
        borderWidth: 2,
        borderColor: '#ccc',
        width: 420,
        height: 660,
        borderRadius: 5,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 420,
        marginBottom: 10,
    }
})

export default HomeScreen;