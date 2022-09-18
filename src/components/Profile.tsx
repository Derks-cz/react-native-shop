import React from 'react'
import {View,Text,StyleSheet, Button} from 'react-native'
import { createDrawerNavigator,DrawerNavigationProp } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const A:React.FC<any> = ({route,navigation}) =>{
    const param = route.params
    return(
        <View>
            <Text>AAAA + {param?.itemId}</Text>
            <Button title='add' onPress={()=> navigation.navigate("A",{itemId:10})} />
        </View>
    )
}

const B:React.FC<any> = ({route,navigation}) =>{
    const param = route.params

    return(
        <View>
            <Text>BBBBBB + {param?.itemId}</Text>
        </View>
    )
}
const Profile:React.FC<any> = ({navigation}) =>{
    
    return (
    <Drawer.Navigator>
        <Drawer.Screen name='A' component={A} />
        <Drawer.Screen name='B' component={B} />
    </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})
export default Profile