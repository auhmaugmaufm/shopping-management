import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { CustomButtonBox } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";


const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.ViewStyle}>
            <TextInput placeholder="Search a name of goods ..." style={styles.input} />

            <View style={styles.AllGoods}>
            </View>
            <View style={styles.container}>
                <View>
                    <TotalSummary />
                </View>
                <View>
                    <CustomButtonBox 
                        title='+'
                        backgroundColor='#72d572'
                        onPress={()=>navigation.navigate("AddGoods")}
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
        marginTop: 20
    },
    input: {
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