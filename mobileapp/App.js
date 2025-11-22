import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Additems from './screens/Additems';
import MedicineListScreen from './screens/MedicineListScreen';  
import Dashboard from './screens/Dashboard';
import UpdateStock from './screens/UpdateStock';
import LowStockAlert from './screens/LowStockAlert';
import QRScanner from './screens/QRScanner';
import Delete from './screens/Delete';

import ExpiredMedicinesScreen from './screens/ExpiredMedicinesScreen'; 

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="AddItems" component={Additems} />
                <Stack.Screen name="MedicineList" component={MedicineListScreen} /> 
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="UpdateStock" component={UpdateStock} />
                
                <Stack.Screen 
                    name="ExpiredMedicinesScreen" 
                    component={ExpiredMedicinesScreen} 
                    options={{ title: 'Expired Medicines' }} 
                />
              <Stack.Screen name="LowStockAlert" component={LowStockAlert} />
              <Stack.Screen name="QRScanner" component={QRScanner}/>
              <Stack.Screen name="Delete" component={Delete}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
