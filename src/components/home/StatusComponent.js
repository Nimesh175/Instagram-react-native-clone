import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {colors, dimensions, fontFamilies, fontSizes} from '../../configurations/constants';

function StatusComponent({item}) {
        return (
                <View style={styles?.container}> 
                    <Image style={styles?.image} source={item?.image} />   
                    <Text numberOfLines={1} style={styles?.text}>{item?.username}</Text> 
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                // backgroundColor: colors?.blue,
                width: dimensions?.heightLevel5,
                height: dimensions?.heightLevel5,
                marginHorizontal: 5,
                marginTop: 5,
                alignItems: 'center',
        },
        image: {
                width: "100%",
                height: "100%",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: colors?.blue,
        },

        text: {
                fontFamily: fontFamilies?.robotoLight,
                fontSize: fontSizes?.fontSmall,
        }
})

export default StatusComponent
