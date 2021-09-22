import { Center, Input, Text } from 'native-base';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { shop15 } from '../../@fake-data/index';
import { IMAGES } from '../../assets';
import ShopComponent from '../../components/shop/ShopComponent';
import { colors, dimensions, fontFamilies } from '../../configurations/constants';

const ShopScreen = ({navigation}) => {
    return (
        <View flex={1} style={styles.container}>
            {/* section: header */}
           <View style={styles?.headerContainer}>
           <View style={styles?.header}>
                      <Text  fontSize="2xl" style={styles?.headerText} >Shop</Text>  
                      
                      <TouchableOpacity onPress={() => console.log("clicked")}>
                         <Image style={styles?.image} source={IMAGES?.menu} alt="message"/>
                      </TouchableOpacity>
            </View>
            <View>
                <Input 
                w="93%" 
                style={styles?.searchbar} 
                variant="rounded" 
                placeholder="Search shops"
                 />
            </View>
           </View>

            {/* section: body */}

            <Center style={styles?.shopContainer}>
                <FlatList
                refreshing={true}
                numColumns={2}                  // set number of columns 
                columnWrapperStyle={styles?.row}  // space them out evenly
                maxToRenderPerBatch={6}
                showsVerticalScrollIndicator={false}
                data={shop15}
                keyExtractor={(item) => item.id}
                onEndReached={() => console.log("FlatList End.")}
                ListFooterComponent={<View style={{height:dimensions?.heightLevel10 * 1.5}}></View>}
                renderItem={({ item }) => (
                    <ShopComponent item={item} />
                )}
                />
            </Center>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
    },

    headerContainer: {
        paddingBottom: dimensions?.paddingLevel2,
        borderBottomWidth: 0.5,
        borderBottomColor: colors?.black25,

    },

    header: {
        top: 0,
        left: 0,
        width: dimensions.fullWidth,
        paddingVertical: dimensions.paddingLevel1 * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: dimensions.paddingLevel1,
        alignItems: 'center',
    },   

    headerText: {
            fontFamily: fontFamilies?.robotoRegular,
            fontWeight: "bold",
    },

    image: {
            width: dimensions.heightLevel4,
            height: dimensions.heightLevel4,
            transform: [{scale: 0.4}]
    },
    searchbar: {
        marginLeft: dimensions?.paddingLevel1,
        fontSize: 13,
        fontFamily: fontFamilies?.robotoMedium,
        borderWidth: 0.5,
        borderColor: colors?.black25,
    },
    row: {
        flex: 1,
        justifyContent: "space-evenly",
    },
});

export default ShopScreen;
