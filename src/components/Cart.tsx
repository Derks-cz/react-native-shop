import React, { useState,useCallback} from 'react'
import {View,Text,StyleSheet, Dimensions,Button} from 'react-native'
import { FlatList, GestureHandlerRootView, PanGestureChangeEventPayload, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { BounceInLeft, BounceInRight, RollInLeft, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
interface CartItemProps{
    title:string
    price:number
    index:number
    removeData: (index:number) => void
}

const data = [
    {id: 1, title: 'Item1', price: 2000},
    {id: 2, title: 'Item2', price: 5000},
    {id: 3, title: 'Item3', price: 1000},
    {id: 4, title: 'Item4', price: 6700},
    {id: 5, title: 'Item5', price: 2900},
    {id: 6, title: 'Item5', price: 2900},
    {id: 7, title: 'Item5', price: 2900},
    {id: 8, title: 'Item5', price: 2900},
    {id: 9, title: 'Item5', price: 2900},
    {id: 10, title: 'Item5', price: 2900},
    {id: 11, title: 'Item5', price: 2900},
    {id: 12, title: 'Item5', price: 2900},
    {id: 13, title: 'Item5', price: 2900},
    {id: 14, title: 'Item5', price: 2900},
    {id: 15, title: 'Item5', price: 2900},
    {id: 16, title: 'Item5', price: 2900},
    {id: 17, title: 'Item5', price: 2920},
    {id: 18, title: 'Item5', price: 2920},
  ];

const WINDOW_WIDTH:number = Dimensions.get("window").width

const TRIGGER_TO_DELETE = -WINDOW_WIDTH * 0.3
const CartItem:React.FC<CartItemProps> = ({removeData,index,title,price}) =>{
    const translateX = useSharedValue(0)
    const opacity = useSharedValue(0)
    const itemHeight = useSharedValue(70)
    const marginVertical = useSharedValue(5)
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive:({translationX}) =>{
            if(translationX <= TRIGGER_TO_DELETE){
                opacity.value = withTiming(1)
            }
            else opacity.value = withTiming(0)
            translateX.value = translationX
        },
        onEnd: () =>{
            const shouldDelete = translateX.value < TRIGGER_TO_DELETE 
            if(shouldDelete){
                translateX.value = withTiming(-WINDOW_WIDTH,undefined,(isFinished)=>{
                    if(isFinished) runOnJS(removeData)(index)
                })
                opacity.value = withTiming(0)
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0)
            }
           else translateX.value = withSpring(0)
        }
        
    })


    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform:[{translateX:translateX.value}]
        }
    })

    const animatedStylyOpacity = useAnimatedStyle(()=>{
        return {
            opacity: opacity.value
        }
    })

    const animatedStyleContainer = useAnimatedStyle(()=>{
        return {
            height: itemHeight.value,
            marginTop: marginVertical.value
        }
    })
    return (
        <Animated.View style={[styles.listContainer,animatedStyleContainer]}>
         <Animated.View style={[styles.trash,animatedStylyOpacity]}>
                <Icon name='trash' color="red" size={30} />
        </Animated.View>
        <PanGestureHandler  onGestureEvent={panGesture} activateAfterLongPress={500}>
            <Animated.View entering={ BounceInLeft.delay(index * 100)} style={[styles.cartItem,animatedStyle]}>
                <Text>{title}</Text>
                <Text>{price}</Text>
            </Animated.View> 
        </PanGestureHandler>
        </Animated.View>
    )
}
const Cart:React.FC = () =>{
    const [items,setItems] = useState(data)
      const removeData = useCallback((index:number) =>{
        let arr = items
        arr.splice(index,1)
        setItems(arr)
      },[items])
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <View style={styles.container}>
                <FlatList  style={styles.flatList} extraData={items} keyExtractor={(item)=>item.id.toString()} data={items} renderItem={({item,index})=> <CartItem removeData={removeData} index={index} title={item.title} price={item.price} /> } />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    listContainer:{
        display:"flex",
        justifyContent:"center",
    },
    container:{
        flex:1,
        alignItems:"center",
    },
    flatList:{
        maxHeight:"89%",
    },
    cartItem:{
        minWidth:"80%",
        padding:8,
        margin:4,
        backgroundColor:"snow",
        elevation:8,
        borderRadius:6,
    },
    trash:{
        position:"absolute",
        right:"10%",
        opacity:0
    }
})
export default Cart