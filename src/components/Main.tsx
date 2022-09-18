
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import Animated, {ZoomIn,SlideInRight, useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
const windowHeight = Dimensions.get('window').height

const items = [
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
    {id: 17, title: 'Item5', price: 2900},
  ];


const Main: React.FC = () => {
  const [added,setAdded] = useState<number[]>([])

  const addToCart = (id:number) =>{
      if(added.includes(id)){
        return setAdded(()=> [...added.filter(a => a != id)])
      }
      setAdded((prev) => [...prev, id])
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
        {items.map((item,i)=>(
            <Animated.View entering={ZoomIn.delay(200 * i)} style={styles.item} key={item.id}>
                <>
                <TouchableOpacity onPress={()=> addToCart(item.id)} style={[styles.pressableContainer]}>
                    <View style={[styles.addToCartButton,added.includes(item.id) ?styles.selected :styles.unselected]} ><Text style={[styles.addButtonLabel]}>+</Text></View>
                </TouchableOpacity>
                <View style={styles.itemImage}></View>
                <View style={styles.itemInfo}>
                    <Text>{item.title}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                </>
            </Animated.View>
        ))}
      </Animated.ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        width:"100%",
        marginTop:10
    },
    scrollView:{
        maxHeight: windowHeight - 140,
        minWidth: "100%",
    },
    scrollViewContainer:{
        width:"100%",
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"space-around",
        padding:4,
    },
    item:{
       width:"40%",
       height:240,
       margin:6,
       marginBottom:10,
       borderRadius:4,
       backgroundColor:"white",
       display:"flex"
    },
    itemImage:{
        
        width:"100%",
        backgroundColor:"mistyrose",
        elevation:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flexGrow:3,
        
    },
    itemInfo:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        flexGrow:1.3,
        width:"100%",
        height:"25%",
        padding:4,

    },
    itemPrice:{
        fontWeight:"bold"
    },
    pressableContainer:{
        position:"absolute",
        width:"100%",
        zIndex:1,
        
        
    },
    addToCartButton:{
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       position:"absolute",
       width:40,
       height:40,
       backgroundColor:"lightgreen",
       borderRadius:100,
       right:-10,
       top:-10
    },
    addButtonLabel:{
        color:"white",
        fontSize:50,
        lineHeight:50
    },
    selected:{
        backgroundColor:"tomato",
        transform:[{rotate:45 + "deg"}]
    },
    unselected:{
        transform:[{rotate:0 + "deg"}]
    }


});
export default Main;
