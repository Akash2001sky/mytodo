

import React,{Context} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
interface Iprops{
    state?:any,
    navigation?:any
}

class MyCustomTabs extends React.Component <Iprops>{

    render(): React.ReactNode {
        const {state, navigation,descriptors}= this.props
     return(
            <View style={{ flexDirection: 'row', backgroundColor:'#19A7CE',height:100, paddingTop:10 }}>
              {state.routes.map((route: { key: string | number; name: any; }, index: any) => {
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
                  });
        
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
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
                    style={{ flex: 1 }}
                  >
                    <View>
                    <Feather
                  name={label === 'Todo' ? 'home' : 'search'}
                  size={34}
                  color={isFocused ? '#F9F5EB' : '#146C94'}
                  style={{marginLeft:85}}
                />
                    <Text style={{ color: isFocused ? '#F9F5EB' : '#146C94' ,textAlign:'center', fontSize:20}}>
                      {label}
                    </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );

      
    }

}

export default MyCustomTabs;
