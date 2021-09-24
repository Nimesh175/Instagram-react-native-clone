import {Button, Center, Input, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import EmptyView from '../../components/EmptyView';
import {colors, dimensions, fontFamilies} from '../../configurations/constants';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';

const LoginScreen = ({navigation}) => {

    const [loggedIn, setloggedIn] = React.useState(false);
    const [googleLoader, setGoogleLoader] = React.useState(false);
    const [userInfo, setuserInfo] = React.useState([]);


    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId:
              '54254594495-c66dt4egj57oo0evulrbusj9i6vkpfl3.apps.googleusercontent.com',
          });
    }, []);

    const GoogleSignInOutHandler = async (props) => {
        setGoogleLoader(true)
        try{
            // Get the users ID token
        const {idToken, user} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential =await auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const credential =await auth()
        .signInWithCredential(googleCredential)
        .then(creteUser => {
            setGoogleLoader(false)
            const {displayName, email, metadata, uid, photoURL, phoneNumber} = creteUser.user;
            
            firestore()
            .collection('Users')
            .doc(uid)
            .get()
            .then(doc => {
                if ( doc?.exists) {
                        console.log('Document data:', doc?.data());

                        if(props?.isSignIn) {
                            //TODO: do somethings with sign-in
                            console.log("GOOGLE: sign-in successfully");
                            setloggedIn(true)
                            navigation.navigate('Tab');
                        }

                           
                    } else {
                         //// doc.data() will be undefined in this case
                        console.log('No such document!');
                        alert("Sign up, you don't have an account!")
                        if (!props?.isSignIn) {
                         //TODO: do somethings with sign-up
                        
                            //firestore: create new user
                            firestore()
                            .collection('Users')
                            .add({
                                uid: uid,
                                displayName: displayName,
                                email: email,
                                photoURL: photoURL,
                                phoneNumber: phoneNumber,
                            })
                            .then(() => {
                                console.log("GOOGLE: sign-up successfully");
                                setloggedIn(true)
                            })
                            .catch(error => console.log("ERROR: User not added!"));
                            
                        }
                    }
                  
                });
        });

        // GOOGLE: sign out: Temperary
        await GoogleSignin.signOut();

        } catch(error) {
            console.log("SIGNIN ERROR: ", error);
            setGoogleLoader(false)
        }
    }


    return (
    <>
        <Loader isLoading={googleLoader}/>
       <Center flex={1} style={styles?.container}>
        {/* header: logo name */}
        <Text fontSize="5xl" style={styles?.textLogo}>Inxtagram</Text>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>
        {/* section: input fields */}
       <Input
            w="90%"
            mx={3}
            placeholder="Username"
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

        {/* button: default login button */}
        <Button
            w="90%"
            isDisabled
            style={styles?.button}
            onPress={() => navigation.navigate('Tab')}
        >
          Log in
        </Button>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        {/* section: forgot text */}
        <Text fontSize="sm">Forgotten your login details? Get help with logging in.</Text>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        {/* section: horizontal line with text */}
        <View style={styles?.hrLine}>
            <Text fontSize="sm" style={styles?.hrText}>OR</Text>
        </View>

        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

        {/* button: google login button */}
        <Center style={styles.body}>
            <View style={styles.sectionContainer}>
            <GoogleSigninButton
                style={{width: 250, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => GoogleSignInOutHandler({isSignIn: true})}
            />
            </View>
            <View style={styles.buttonContainer}>
            {!loggedIn && <Text>You are currently logged out</Text>}
            </View>
        </Center>


        {/* footer: sign up */}
        <View style={styles?.footer}>
            <Text fontSize="sm">Don't have an account? </Text>
            <TouchableOpacity
             onPress={() => navigation.navigate('SignUp')}
            >
                <Text fontSize="sm" style={{color: colors?.blue}}>Sign up.</Text>
            </TouchableOpacity>
        </View>

      </Center>
      </>
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

export default LoginScreen;
