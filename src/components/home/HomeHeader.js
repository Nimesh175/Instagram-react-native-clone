import { Button, Center, Input, Text, Image } from 'native-base';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {IMAGES} from '../../assets';
import { dimensions, colors, fontFamilies, fontSizes } from '../../configurations/constants';

function HomeHeader() {
        return (
                <View style={styles?.container}>
                      <Text  fontSize="3xl" style={styles?.logoText} >Inxtagram</Text>  
                      
                      <TouchableOpacity onPress={() => console.log("clicked")}>
                         <Image style={styles?.image} source={IMAGES?.messanger} alt="message"/>
                      </TouchableOpacity>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                top: 0,
                left: 0,
                width: dimensions.fullWidth,
                paddingVertical: dimensions.paddingLevel1 * 0.1,
                // backgroundColor: colors?.fbBlue,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.paddingLevel1,
                alignItems: 'center',
        },   

        logoText: {
                fontFamily: fontFamilies?.blackBerry,
                
        },

        image: {
                width: dimensions.heightLevel4,
                height: dimensions.heightLevel4,
                transform: [{scale: 0.45}]
        }
})

export default HomeHeader;
