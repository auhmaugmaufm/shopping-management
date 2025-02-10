import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from "react-native";
import { CustomButtonBox, CustomButtonLong } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";
import TextInputs from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';

const STORAGE_KEY = "@goods_data";

const reducer = (state, action) => {
    switch (action.type) {
        case "Not yet!":
            return { total: state.total + action.total }
        case "Bought":
            return { total: state.total - action.total }
        case 'Reset':
            return { total: 0 }
        default:
            return state;
    }
}

const HomeScreen = () => {

    const [goods, setGoods] = useState([]);
    const [totalSum, dispatch] = useReducer(reducer, { total: 0 })
    const [mode, setMode] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSettingVisible, setIsSettingVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('white')
    const [key, setKey] = useState('');
    const [filteredGoods, setFilteredGoods] = useState(goods);

    const [id, setId] = useState('')
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [img, setImg] = useState("");
    const [status, setStatus] = useState('')
    
    useEffect(() => {
        loadGoods();
    }, []);

    useEffect(() => {
        searchGoods(key);
    }, [goods]);

    // โหลดสินค้าในอดีตที่เราเคยเพิ่มไว้ ผ่าน local storage
    const loadGoods = async () => {
        try {
            const storedGoods = await AsyncStorage.getItem(STORAGE_KEY)
            //console.log(storedGoods)
            if (storedGoods) {
                const parsedGoods = JSON.parse(storedGoods);
                setGoods(parsedGoods);
                loadTotal(parsedGoods);
            } else {
                setGoods([])
            }
        } catch (error) {
            console.log('Failed to load: ', error)
        }
    }

    // คำนวณราคาสินค้าที่เรายังไม่ซื้อ ทำงานเฉพาะครั้งแรกเมื่อเข้าแอพ
    const loadTotal = (goods) => {
        let totalBeforeStart = 0;
        goods.forEach((item) => {
            if (item.status === 'Not yet!') {
                totalBeforeStart += parseFloat(item.cost);
            }
        });
        dispatch({ type: 'Not yet!', total: totalBeforeStart });
    };

    // การเปลี่ยนธีม : Bright(default) & Dark Mode
    const changedTheme = () => {
        setDarkMode(!darkMode)
        setIsSettingVisible(false)
        setBackgroundColor(darkMode ? "white" : "#212121");
    }
    
    // การค้นหาสินค้า
    const searchGoods = (text) => {
        setKey(text);
        const filtered = goods.filter((good) =>
            good.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredGoods(filtered);
    };

    // การเพิ่มสินค้า โดยตั้งค่าสถานะเป็น Not yet! เป็นค่าเริ่มต้นอัตโนมัติ
    const addGoods = async () => {
        if (!title.trim() || isNaN(cost) || cost === "" || parseFloat(cost) < 0) {
            alert("กรุณากรอกค่า Title และ Cost ห้ามน้อยกว่า 0");
            return;
        }
        // กำหนดค่าเริ่มต้น ของรูปสินค้า หากไม่ได้ใส่ลิงก์มาจะใช้รูป default
        const defaultImg = 'https://i.pinimg.com/736x/18/36/67/183667deaaecb9c275b2c3ae80a58c68.jpg'
        const newGoods = { id: Date.now().toString(), title, cost, status, img: img.trim() ? img : defaultImg }
        const updatedGoods = [newGoods, ...goods];
        dispatch({ type: 'Not yet!', total: parseFloat(newGoods.cost) });
        setGoods(updatedGoods);
        setIsModalVisible(false);
        setTitle("");
        setCost("");
        setImg("");
        setStatus("")
        setId("")
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    // การแก้ไข้สินค้า
    const editGoods = async () => {
        if (!title.trim() || isNaN(cost) || cost === "" || parseFloat(cost) < 0) {
            alert("กรุณากรอกค่า Title และ Cost ห้ามน้อยกว่า 0");
            return;
        }

        const updatedGoods = goods.map((item) => {
            if (item.id.toString() === id) {
                return { ...item, title, cost, img, status };
            }
            return item;
        });

        setGoods(updatedGoods);
        setIsModalVisible(false);
        setId("")
        setTitle("");
        setCost("");
        setImg("");
        setStatus("");

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    // การเปลี่ยนสถานะสินค้า สามารถเปลี่ยนสลับไปมาได้ : Not yet! & Bought 
    const switchStatus = async () => {
        const updatedGoods = goods.map((item) => {
            if (item.id.toString() === id) {
                let tmp = item.status != 'Bought' ? 'Bought' : 'Not yet!'
                dispatch({ type: tmp, total: parseFloat(item.cost) });
                return { ...item, status: tmp };
            }
            return item;
        });
        setGoods(updatedGoods);
        setIsModalVisible(false);
        setId("")
        setTitle("");
        setCost("");
        setImg("");
        setStatus("");


        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    // การลบสินค้าทีละชิ้น มีการถามอีกครั้งเพื่อยืนยันการลบ เมื่อทำการกดลบ
    const deleteGoods = async () => {
        if (status === 'Not yet!') {
            dispatch({ type: 'Bought', total: cost });
        }
        const newGoods = goods.filter((item) => item.id != id)
        setGoods(newGoods)
        setIsModalVisible(false);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    // การลบสินค้าทุกชิ้น มีแจ้งเตือนก่อนลบ โดยเราสามารถเลือกยืนยันได้
    const clearAllStorage = async () => {
        setIsSettingVisible(false);
        try {
            await AsyncStorage.clear();
            dispatch({ type: 'Reset' })
            setGoods([]);
            //console.log('Clear');
        } catch (error) {
            console.log('Failed to clear storage: ', error);
        } 
    };

    // เปิด modal เพื่อเพิ่มสินค้าหรือแก้ไขสินค้า
    const openModal = (text, item) => {
        setMode(text);
        if (text !== "add" && item) {
            setId(item.id)
            setTitle(item.title);
            setCost(item.cost);
            setImg(item.img);
            setStatus(item.status)
        } else {
            setId('')
            setTitle('');
            setCost('');
            setImg('');
            setStatus("Not yet!"); // อันนี้ส่งค่าในส่วนของการเพิ่มสินค้า
        }
        setIsModalVisible(true);
    };

    return (
        <View style={[styles.ViewStyle, { backgroundColor }]}>
            <Modal transparent={true} animationType="fade" visible={isModalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 280,
                            paddingLeft: 30
                        }}>
                            <View></View>
                            <Text style={styles.title}>{mode === "add" ? "Add GOODS" : "Edit GOODS"}</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}><Icon name="cancel" size={30} color="#ccc" /></TouchableOpacity>
                        </View>

                        <TextInputs width={300} style={styles.input} text="Enter a name" value={title} onChangeText={setTitle} />
                        <TextInputs width={300} style={styles.input} text="Enter a cost" value={cost} keyboardType="numeric" onChangeText={setCost} />
                        <TextInputs width={300} style={styles.input} text="Paste an image (Optional)" value={img} onChangeText={setImg} />
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 300,
                            marginTop: 15
                        }}>

                            {mode === "add" ?
                                <CustomButtonLong
                                    title="Add"
                                    backgroundColor="#0D47A1"
                                    onPress={() => addGoods()}
                                /> :
                                [
                                    <CustomButtonBox
                                        key = 'delete'
                                        title='Delete'
                                        backgroundColor='#CD1818'
                                        onPress={() => {
                                            Alert.alert('Are you sure ? ', 'Delete this Goods', [
                                                {
                                                    text: 'Yes',
                                                    onPress: () => {deleteGoods()}
                                                },{
                                                    text: 'No'
                                                }
                                            ])
                                        }}
                                    />,
                                    <CustomButtonBox
                                        key='Switch'  
                                        title='Switch'
                                        backgroundColor='#321E1E'
                                        onPress={() => switchStatus()}
                                    />,
                                    <CustomButtonBox
                                        key='save'
                                        title="Save"
                                        backgroundColor='#116D6E'
                                        onPress={() => editGoods()}
                                    />
                                ]
                            }
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={isSettingVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 280,
                            paddingLeft: 30
                        }}>
                            <View></View>
                            <Text style={styles.title}>Setting</Text>
                            <TouchableOpacity onPress={() => setIsSettingVisible(false)}><Icon name="cancel" size={30} color="#ccc" /></TouchableOpacity>
                        </View>

                        <CustomButtonLong
                            title='Change a Theme'
                            backgroundColor="#5C5470"
                            onPress={() => changedTheme()}
                        />
                        <CustomButtonLong
                            title="Delete All"
                            backgroundColor="#BE3144"
                            onPress={() => {
                                Alert.alert('Are you sure ? ', 'Delete all Goods', [
                                    {
                                        text: 'Yes',
                                        onPress: () => {clearAllStorage()}
                                    },{
                                        text: 'No'
                                    }
                                ])
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <TextInputs text="Search a name of goods ..." width={420} value={key}
                onChangeText={searchGoods} />
            <View style={styles.AllGoods}>
                <FlatList
                    data={filteredGoods}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        //console.log(item.id)
                        return (
                            <TouchableOpacity onPress={() => openModal("edit", item)}>
                                <ItemCard name={item.title} cost={parseFloat(item.cost)} img={item.img} status={item.status} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <View style={styles.container}>

                <CustomButtonBox title="SETTING" backgroundColor="#622569" onPress={() => setIsSettingVisible(true)} />
                <TotalSummary total={totalSum.total} />
                <CustomButtonBox title="ADD" backgroundColor="#116D6E" onPress={() => openModal("add")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: "center",
    },
    AllGoods: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "white",
        width: 420,
        height: 700,
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 10,
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
        backgroundColor: "white",
        borderRadius: 50,
        padding: 28,
        alignItems: "center",
        elevation: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default HomeScreen;
