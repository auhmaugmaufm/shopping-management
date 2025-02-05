import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { CustomButtonBox, CustomButtonLong } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";
import TextInputs from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@card_data";

const HomeScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [img, setImg] = useState("");

    const [goods, setGoods] = useState([]);
    const [mode, setMode] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const addGoods = async () => {
        if (!title.trim() || !cost.trim()) {
            alert('กรุณากรอกค่า Title และ Cost')
            return;
        }
        const newGoods = { id: Date.now().toString(), title, cost, img }
        const updateGoods = [newGoods, ...goods]
        setGoods(updateGoods)
        setTitle('')
        setCost('')
        setImg('')

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updateGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
        setIsVisible(false);
    }

    const loadGoods = async () => {
        try {
            const storedGoods = await AsyncStorage.getItem(STORAGE_KEY)
            console.log(storedGoods)
            setGoods(JSON.parse(storedGoods))
        } catch (error) {
            console.log('Failed to load: ', error)
        }
    }

    useEffect(() => {
        loadGoods() // ส่วนที่ให้โค้ดทำงาน
    }, [])


    const openModal = (text) => {
        setMode(text);
        setIsVisible(true);
    };

    const clearAllStorage = async () => {
        try {
            await AsyncStorage.clear();
            setGoods([]); // รีเซ็ต state
            console.log('ล้างข้อมูลทั้งหมดสำเร็จ');
        } catch (error) {
            console.log('Failed to clear storage: ', error);
        }
    };


    return (
        <View style={styles.ViewStyle}>
            <TextInputs text="Search a name of goods ..." width={420} />
            <View style={styles.AllGoods}>
                <FlatList
                    data={goods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => openModal("edit")}>
                                <ItemCard name={item.title} cost={item.cost} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <Modal transparent={true} animationType="fade" visible={isVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{mode === "add" ? "Add GOODS" : "Edit GOODS"}</Text>
                        <TextInput style={styles.input} placeholder="Title ..."  value={title} onChangeText={setTitle} />
                        <TextInput style={styles.input} placeholder="Cost ..." value={cost} onChangeText={setCost} />
                        <TextInput style={styles.input} placeholder="Image ..." value={img} onChangeText={setImg} />
                        <CustomButtonLong
                            title={mode === "add" ? "Add GOODS" : "Save GOODS"}
                            backgroundColor={mode === "add" ? "green" : "blue"}
                            onPress={()=>addGoods()}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.container}>
                <CustomButtonBox title="CLEAR" backgroundColor="red" onPress={clearAllStorage} />
                <TotalSummary />
                <CustomButtonBox title="ADD" backgroundColor="#e79517" onPress={() => openModal("add")} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#acd2f4",
    },
    AllGoods: {
        borderWidth: 1,
        borderColor: "#294cdc",
        width: 420,
        height: 690,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "white",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 420,
    },
    modalOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 350,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 28,
        alignItems: "center",
        elevation: 5,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#294cdc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default HomeScreen;
