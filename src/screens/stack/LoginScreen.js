import React from 'react';
import {StyleSheet, View, Button} from 'react-native';


const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Button style={{marginTop: 10}} title="Sign In" onPress={() => navigation.navigate('Tab')}/>
            <Button style={{marginTop: 10}} title="Sign Up" color="#841584"
                    onPress={() => navigation.navigate('SignUp')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
});

export default LoginScreen;
