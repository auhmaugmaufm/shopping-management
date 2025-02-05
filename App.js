import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screen/HomeScreen";
import AddGoodsScreen from "./src/screen/AddGoodsScreen"

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: ' 🛍️ | Shopping Management' }}
                />
                <Stack.Screen
                    name="AddGoods"
                    component={AddGoodsScreen}
                    options={{ title: '🛍️ | Goods' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;