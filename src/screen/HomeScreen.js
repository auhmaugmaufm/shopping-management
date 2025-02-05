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
    const [selectedItem, setSelectedItem] = useState(null); // สำหรับเก็บข้อมูลสินค้าที่เลือก

    // ฟังก์ชันสำหรับเพิ่มสินค้า
    const addGoods = () => {
        if (!title.trim() || cost < 0) {
            alert("กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0");
            return;
        }

        const newGoods = { id: Date.now().toString(), title, cost, img };
        const updatedGoods = [newGoods, ...goods];
        setGoods(updatedGoods);
        setTitle("");
        setCost("");
        setImg("");
        setIsVisible(false);

        // เก็บข้อมูลลง AsyncStorage
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods));
    };

    // ฟังก์ชันสำหรับแก้ไขสินค้า
    const editGoods = () => {
        if (!title.trim() || cost < 0) {
            alert("กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0");
            return;
        }

        const updatedGoods = goods.map((item) => {
            if (item.id === selectedItem.id) {
                return { ...item, title, cost, img }; // อัปเดตข้อมูลสินค้าที่เลือก
            }
            return item;
        });

        setGoods(updatedGoods);
        setTitle("");
        setCost("");
        setImg("");
        setIsVisible(false);

        // เก็บข้อมูลลง AsyncStorage
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods));
    };

    const loadCard = async () => {
        try {
            const storedCards = await AsyncStorage.getItem(STORAGE_KEY)
            console.log(storedCards)
            setGoods(JSON.parse(storedCards))
        } catch (error) {
            console.log('Failed to load: ', error)
        }
    }

    useEffect(() => {
        loadCard() // ส่วนที่ให้โค้ดทำงาน
    }, [isVisible])

    // ฟังก์ชันเปิด Modal และตั้งค่าข้อมูลเพื่อแก้ไข
    const openModal = (text, item) => {
        setMode(text);
        if (text === "edit" && item) {
            setTitle(item.title);
            setCost(item.cost);
            setImg(item.img);
            setSelectedItem(item); // เก็บข้อมูลสินค้าที่เลือก
        } else {
            setTitle('');
            setCost('');
            setImg('');
            setSelectedItem(null);
        }
        setIsVisible(true);
    };

    // ฟังก์ชันล้างข้อมูลจาก AsyncStorage
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
            <Modal transparent={true} animationType="fade" visible={isVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{mode === "add" ? "Add GOODS" : "Edit GOODS"}</Text>
                        <TextInput style={styles.input} placeholder="Title ..." value={title} onChangeText={setTitle} />
                        <TextInput style={styles.input} placeholder="Cost ..." value={cost} onChangeText={setCost} />
                        <TextInput style={styles.input} placeholder="Image ..." value={img} onChangeText={setImg} />
                        <CustomButtonLong
                            title={mode === "add" ? "Add GOODS" : "Save GOODS"}
                            backgroundColor={mode === "add" ? "green" : "blue"}
                            onPress={mode === "add" ? addGoods : editGoods}
                        />
                    </View>
                </View>
            </Modal>
            <TextInputs text="Search a name of goods ..." width={420} />
            <View style={styles.AllGoods}>
                <FlatList
                    data={goods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => openModal("edit", item)}>
                                <ItemCard name={item.title} cost={item.cost} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

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
        backgroundColor: 'white',
        width: 300
    }
});

export default HomeScreen;
