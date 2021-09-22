import { Center, Text } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../assets';
import { colors, dimensions, fontFamilies, fontSizes } from '../../configurations/constants';

function ShopComponent({item}) {
        return (
                <TouchableOpacity>
                        <View  style={styles?.container}>
                                <View style={styles?.head}>
                                <Image style={styles?.profileImage} source={item?.logo} />
                                <Text numberOfLine={1} style={styles?.headerTitle}>{item?.username}</Text>
                                </View>
                               <Image style={styles?.innerImage} source={item?.image} />
                        <Text 
                        fontSize="sm"
                        numberOfLines={1} 
                        style={styles?.outerText}>
                           {item?.description}
                        </Text>
                        </View>
                </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
        container: {
                backgroundColor: colors?.fbBlue,
                width: dimensions?.widthLevel11,
                height: dimensions?.widthLevel11,
                margin: dimensions?.paddingLevel1,
                marginBottom: dimensions?.paddingLevel3,
                borderRadius: 10,
        },

        outerText: {
                // backgroundColor: 'green',
                marginBottom: dimensions?.paddingLevel1,
                marginTop: dimensions?.paddingLevel1 * 0.5,
                paddingHorizontal: dimensions?.paddingLevel1,
                width: "100%",
        },

        innerImage: {
                width: "100%",
                height: "100%",
                borderRadius: 10,
        },

        head: {
                backgroundColor: "rgba(0,0,0,0.15)",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingVertical: dimensions?.paddingLevel1,
                paddingHorizontal: dimensions?.paddingLevel1,
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1,
                flexDirection: 'row',
                alignItems: 'center',
               
        },

        profileImage: {
                width: dimensions?.paddingLevel3,
                height: dimensions?.paddingLevel3,
                borderRadius: 50,
        },

        headerTitle: {
                fontFamily: fontFamilies?.robotoMedium,
                fontSize: fontSizes?.fontSmall,
                marginLeft: 5,
                color: colors?.white,
                width: "80%",
        },
})
export default ShopComponent
