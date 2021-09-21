import { Button, Center, Input, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import EmptyView from '../../components/EmptyView';
import { colors, dimensions, fontFamilies } from '../../configurations/constants';

const SignUpScreen = ({navigation}) => {
    return (

       <Center flex={1} style={styles?.container}>
        {/* header section: logo name */}
        <Text fontSize="5xl" style={styles?.textLogo}>Inxtagram</Text>
        {/* <EmptyView style={{marginTop: dimensions.heightLevel1}}/> */}
        <Text fontSize="lg">Sign up to see photos and videos from your friends.</Text>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* button: facebook sign up button */}
        <Button 
            w="90%" 
            style={styles?.button}
            onPress={() => navigation.navigate('Tab')}
        >
            Sign up with facebook
        </Button>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* section: horizontal line with text */}
        <View style={styles?.hrLine}>
            <Text fontSize="sm" style={styles?.hrText}>OR</Text>
        </View>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* section: input fields */}
         <Input
            w="90%"
            mx={3}
            placeholder="Full Name"
            _light={{
                placeholderTextColor: "blueGray.400",
            }}
            _dark={{
                placeholderTextColor: "blueGray.50",
            }}
         />
        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

       <Input
            w="90%"
            mx={3}
            placeholder="Email"
            _light={{
                placeholderTextColor: "blueGray.400",
            }}
            _dark={{
                placeholderTextColor: "blueGray.50",
            }}
        />

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        <Input
            w="90%"
            mx={3}
            secureTextEntry 
            placeholder="Password"
            _light={{
                placeholderTextColor: "blueGray.400",
            }}
            _dark={{
                placeholderTextColor: "blueGray.50",
            }}
        />

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        <Input
            w="90%"
            mx={3}
            secureTextEntry 
            placeholder="ReType Password"
            _light={{
                placeholderTextColor: "blueGray.400",
            }}
            _dark={{
                placeholderTextColor: "blueGray.50",
            }}
        />

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* button: default login button */}
        <Button 
            w="90%" 
            isDisabled
            style={styles?.button}
            onPress={() => navigation.navigate('Tab')}
        >
          Sign up
        </Button>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        {/* section: forgot text */}
        <Text fontSize="sm">By signing up, you agree to our Terms,</Text>
        <Text fontSize="sm"> Data, Policy and Cookies Policy.</Text>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>


        


        {/* footer: sign up */}
      
        <View style={styles?.footer}>
            <Text fontSize="sm">Have an account? </Text>
            <TouchableOpacity
             onPress={() => navigation.goBack()}
            >
                <Text fontSize="sm" style={{color: colors?.blue}}>Sign in.</Text>
            </TouchableOpacity>
        </View>

      </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors?.white,
    },

    textLogo: {
        fontFamily: fontFamilies?.blackBerry,
        color: colors?.black,
    },

    button: {
        backgroundColor: colors?.fbBlue,
    },

    hrLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors?.black50,
        width: '90%',
    },

    hrText: {
        position: 'absolute',
        top: -12,
        alignSelf: 'center',
        backgroundColor: colors?.white,
        paddingHorizontal: dimensions?.paddingLevel1,
        color: colors?.black50,
    }, 

    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingVertical: dimensions?.paddingLevel1,
        backgroundColor: colors?.white,
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: colors?.black50,
        justifyContent: 'center',
    }
});


export default SignUpScreen;
