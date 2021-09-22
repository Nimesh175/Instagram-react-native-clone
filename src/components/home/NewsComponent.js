import React from 'react';
import { View,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import {  Center, Text } from 'native-base';
import {colors, dimensions, fontSizes, fontFamilies} from '../../configurations/constants';
import {IMAGES} from '../../assets';

function NewsComponent({item}) {

        const [state , setState] = React.useState({
                isHeartActive: false,
                isBookmarkActive: false,
        });

        return (
                <Center style={styles?.container}>
                        {/* section: header */}
                        <View style={styles?.header}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={styles?.profileImage} source={item?.image} alt="news"/>  
                                        <Text  fontSize="sm" style={styles?.usernameText} >{item?.username}</Text>
                                </View>
                                <TouchableOpacity onPress={() => console.log("clicked")}>
                                        <Image style={styles?.moreImage} source={IMAGES?.more} alt="message"/>
                                </TouchableOpacity>
                        </View>

                        {/* section: body */}
                        <Image style={styles?.image} source={item?.image} alt="news"/>

                        {/* section: footer */}
                        <View style={styles?.header}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => {
                                                setState((state) => ({
                                                        ...state,
                                                        isHeartActive: !state.isHeartActive
                                                }));
                                        }}>
                                                <Image style={styles?.footerIcon} source={state?.isHeartActive ? IMAGES?.heartRed : IMAGES?.heart } alt="like"/>
                                        </TouchableOpacity> 
                                        {/* <Text  fontSize="sm" style={styles?.usernameText} >21</Text> */}

                                        <TouchableOpacity onPress={() => console.log("clicked")}>
                                                <Image style={styles?.footerIcon} source={IMAGES?.chatBubble} alt="chat"/>
                                        </TouchableOpacity>
                                        {/* <Text  fontSize="sm" style={styles?.usernameText} >{item?.username}</Text> */}

                                        <TouchableOpacity onPress={() => console.log("clicked")}>
                                                <Image style={styles?.footerIcon} source={IMAGES?.send_2} alt="send"/>
                                        </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => {
                                                setState((state) => ({
                                                        ...state,
                                                        isBookmarkActive: !state.isBookmarkActive
                                                }));
                                        }}>
                                        <Image style={styles?.footerIcon} source={state?.isBookmarkActive ? IMAGES?.bookmarkActive : IMAGES?.bookmark} alt="bookmark"/>
                                </TouchableOpacity>
                        </View>
                </Center>
        )
}

const styles = StyleSheet.create({
        container: {
                width: dimensions?.fullWidth * 0.99,
                marginVertical: 10,
                alignItems: "center",
        },

        image: {
                width: dimensions?.fullWidth,
                height: dimensions?.heightLevel10 * 3,
                borderRadius: 5,
        },

        header: {
                top: 0,
                left: 0,
                width: dimensions.fullWidth,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.paddingLevel1,
                alignItems: 'center',
        },   

        usernameText: {
                fontFamily: fontFamilies?.robotoRegular,     
        },

        profileImage: {
                width: dimensions.heightLevel4,
                height: dimensions.heightLevel4,
                transform: [{scale: 0.45}],
                borderRadius: 50,
        },

        moreImage: {
                width: dimensions.heightLevel3,
                height: dimensions.heightLevel3,
                transform: [{scale: 0.45}],
        },
        footerIcon: {
                width: dimensions.heightLevel3,
                height: dimensions.heightLevel3,
                transform: [{scale: 0.45}],   
        },
})

export default NewsComponent
