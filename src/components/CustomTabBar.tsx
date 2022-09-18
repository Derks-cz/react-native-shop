import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import  Icon  from 'react-native-vector-icons/FontAwesome';

interface IconType {
    [key:string]: string
}

const icons:IconType = {
    "Main":"home",
    "Cart":"shopping-cart",
    "Profile":"user"
}


const {width} = Dimensions.get("window")
const MARGIN = 12
const TAB_BAR_WIDTH = width - MARGIN * 2
const T_WIDTH = TAB_BAR_WIDTH / Object.keys(icons).length

const CustomTabBar:React.FC<any> = ({ state, descriptors, navigation, }) => {
  const positionX = useSharedValue(0);

    useEffect(()=>{
        positionX.value = T_WIDTH * state.index
    },[state.index])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(positionX.value,{damping:16,mass:1})}],
    };
  });
  return (
    <View style={styles.tabBarContainer}>
        <View style={styles.slidingTabContainer}>
            <Animated.View style={[styles.slidingTab,animatedStyles]} />
        </View>
      {state.routes.map((route:any, index:number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true});
          }
        };
        
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex:1, alignSelf:"center",alignItems:"center"}}
            key={route.key}
          >
            <TabIcon route={route} isFocused={isFocused} />
            <Text style={{ color: isFocused ? 'black' : ''}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon:React.FC<{route:any,isFocused:boolean}> = ({route,isFocused}) =>{
    const positionY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(()=>{
        return {
            transform: [{ translateY: withSpring(positionY.value,{damping:16,mass:1})}],
        };
    })

    const icnonTranslateY = (value:number) =>{
        positionY.value = value
    }

    useEffect(()=>{
        if(isFocused) icnonTranslateY(-15)
        else icnonTranslateY(0)
    },[isFocused])

    const tabIconName:string = icons[route.name]
    return(
        <Animated.View style={animatedStyles}>
            <Icon name={tabIconName} style={{elevation: isFocused ? 12: 1}} size={30} color={isFocused ? "lawngreen" :"black"} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabBarContainer:{
      flexDirection:"row",
      width:TAB_BAR_WIDTH,
      height:60,
      position:"absolute",
      bottom:MARGIN,
      backgroundColor:"snow",
      justifyContent:"space-around",
      alignSelf:"center",
      elevation:16
    },
    slidingTabContainer:{
      ...StyleSheet.absoluteFillObject,
      width:T_WIDTH,
      alignItems:"center"
      
    },
    slidingTab:{
        width:50,
        height:50,
        backgroundColor:"cornflowerblue",
        borderRadius:100,
        bottom:20,
        elevation:6
    }
  })

export default CustomTabBar