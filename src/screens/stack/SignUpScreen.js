import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const SignUpScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Button style={{marginTop: 10}} title="Sign In" onPress={() => navigation.goBack()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
});

export default SignUpScreen;
