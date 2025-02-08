import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from "react-native";
import { CustomButtonBox, CustomButtonLong } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";
import TextInputs from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [id, setId] = useState('')
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [img, setImg] = useState("");
    const [status, setStatus] = useState('')
    const [totalSum, dispatch] = useReducer(reducer, { total: 0 })


    const [goods, setGoods] = useState([]);
    const [mode, setMode] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const [key, setKey] = useState('');
    const [filteredHeroes, setFilteredHeroes] = useState(goods);

    const searchHero = (text) => {
        setKey(text);
        const filtered = goods.filter((good) =>
            good.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredHeroes(filtered);
    };



    const addGoods = async () => {
        if (!title.trim() || isNaN(cost) || cost === "" || parseFloat(cost) < 0) {
            alert("กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0");
            return;
        }
        const defaultImg = 'https://i.pinimg.com/736x/18/36/67/183667deaaecb9c275b2c3ae80a58c68.jpg'
        const newGoods = { id: Date.now().toString(), title, cost, status, img: img.trim() ? img : defaultImg }
        const updatedGoods = [newGoods, ...goods];
        dispatch({ type: 'Not yet!', total: parseFloat(newGoods.cost) });
        setGoods(updatedGoods);
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
        searchHero(key)
        setIsVisible(false);

    };

    const editGoods = async () => {
        if (!title.trim() || isNaN(cost) || cost === "" || parseFloat(cost) < 0) {
            alert("กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0");
            return;
        }

        const updatedGoods = goods.map((item) => {
            if (item.id === id) {
                return { ...item, title, cost, img, status };
            }
            return item;
        });

        setGoods(updatedGoods);
        setId('')
        setTitle("");
        setCost("");
        setImg("");
        setStatus("");
        searchHero(key)
        setIsVisible(false);

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    const switchStatus = async () => {
        const updatedGoods = goods.map((item) => {
            if (item.id === id) {
                let tmp = item.status != 'Bought' ? 'Bought' : 'Not yet!'
                dispatch({ type: tmp, total: parseFloat(item.cost) });
                return { ...item, status: tmp };
            }
            return item;
        });
        setGoods(updatedGoods);
        setId('')
        setTitle("");
        setCost("");
        setImg("");
        setStatus("");
        setIsVisible(false);

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    const deleteGoods = async () => {
        if( status === 'Not yet!' ) {
            dispatch({ type: 'Bought', total: cost });
        }
        const newGoods = goods.filter((item) => item.id != id)
        setGoods(newGoods)
        setIsVisible(false);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGoods))
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const loadGoods = async () => {
        try {
            const storedGoods = await AsyncStorage.getItem(STORAGE_KEY)
            // console.log(storedGoods)
            if (storedGoods) {
                setGoods(JSON.parse(storedGoods))
            } else {
                setGoods([])
            }
        } catch (error) {
            console.log('Failed to load: ', error)
        }
    }

    useEffect(() => {
        loadGoods();
    }, []);

    useEffect(() => {
        
        searchHero(key);
    }, [goods]);

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
        setIsVisible(true);
    };

    const clearAllStorage = async () => {
        try {
            await AsyncStorage.clear();
            dispatch({type: 'Reset'})
            setGoods([]);
            console.log('Clear Done!');
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
                    <TextInputs width={300} style={styles.input} text="Title ..." value={title} onChangeText={setTitle} />
                    <TextInputs width={300} style={styles.input} text="Cost ..." value={cost} keyboardType="numeric" onChangeText={setCost} />
                    <TextInputs width={300} style={styles.input} text="Image ..." value={img} onChangeText={setImg} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 300,
                        marginTop: 15
                    }}>

                        {mode === "add" ?
                            <CustomButtonBox
                                title='Cancel'
                                backgroundColor='#ccc'
                                onPress={() => setIsVisible(false)}
                            /> :
                            [
                                <CustomButtonBox
                                    title='Delete'
                                    backgroundColor='red'
                                    onPress={deleteGoods}
                                />,
                                <CustomButtonBox
                                    title='Switch'
                                    backgroundColor='pink'
                                    onPress={switchStatus}
                                />
                            ]

                        }

                        <CustomButtonBox
                            title={mode === "add" ? "Add" : "Save"}
                            backgroundColor={mode === "add" ? "#0D47A1" : "blue"}
                            onPress={mode === "add" ? addGoods : editGoods}
                        />
                    </View>

                </View>
            </View>
        </Modal>
        <TextInputs text="Search a name of goods ..." width={420} value={key}
            onChangeText={searchHero} />
        <View style={styles.AllGoods}>
            <FlatList
                data={filteredHeroes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => openModal("edit", item)}>
                            <ItemCard name={item.title} cost={item.cost} img={item.img} status={item.status} />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>

        <View style={styles.container}>
            <CustomButtonBox title="CLEAR ALL" backgroundColor="#8e6a9a" onPress={clearAllStorage} />
            <TotalSummary total={totalSum.total} />
            <CustomButtonBox title="ADD" backgroundColor="#427794" onPress={() => openModal("add")} />
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: "center",
        //backgroundColor: "#212121",
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
    }
});

export default HomeScreen;
