import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert  } from "react-native";
import { CustomButtonBox } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";
import TextInputs from "../components/TextInput";


const HomeScreen = ({ navigation }) => {
    const [goods, setGoods] = useState([
        { id: '1', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Bought' },
        { id: '2', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Bought' },
        { id: '3', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '4', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '5', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '6', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Bought' },
        { id: '7', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '8', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '9', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '10', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Bought' },
        { id: '11', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Not yet' },
        { id: '12', title: 'NINIBARA', cost: 200, category: 'Fashion', status: 'Bought' },

    ])


    return (
        <View style={styles.ViewStyle}>
            <View style={styles.container}>
                <View>
                    <CustomButtonBox
                        title='⚙️'
                        backgroundColor='#eddfb0'
                        
                    />
                </View>
                <View>
                    <TotalSummary />
                </View>
                <View>
                    <CustomButtonBox
                        title='+'
                        backgroundColor='#e79517'
                        onPress={() => navigation.navigate("AddGoods", { mode: '' })
                        }
                    />
                </View>
            </View>
            <TextInputs text="Search a name of goods ..." width={420} />
            <View style={styles.AllGoods}>
                <FlatList
                    data={goods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity >
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
        </View>
    )
}

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#acd2f4'
    },
    AllGoods: {
        borderWidth: 1,
        borderColor: '#294cdc',
        width: 420,
        height: 660,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 420,
        marginTop: 10
    }
})

export default HomeScreen;