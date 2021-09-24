import { Button, Center, Input, Text } from 'native-base';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { IMAGES } from '../../assets';
import EmptyView from '../../components/EmptyView';
import { colors, dimensions, fontFamilies } from '../../configurations/constants';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';

const SignUpScreen = ({navigation}) => {

    // Local state
    const [imageState, setImageState] = React.useState({ 
        filePath: undefined,
        fileData: undefined,
        fileUri: undefined
    });

    // GOOGLE: signup state
    const [loggedIn, setloggedIn] = React.useState(false);
    const [googleLoader, setGoogleLoader] = React.useState(false);
    const [userInfo, setuserInfo] = React.useState([]);
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId:
              '54254594495-c66dt4egj57oo0evulrbusj9i6vkpfl3.apps.googleusercontent.com',
          });
    }, []);



    // react native image picker
    // step: 01
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

     // step: 02  
    function selectImageHandler() {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                setImageState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri
                });
            }
            });
    }

     /**  step: 03
      * optional: 01
      */
    function renderFileData() {
    if (imageState.fileData) {
        return <Image source={{ uri: 'data:image/jpeg;base64,' + imageState?.fileData }}
        style={styles?.images}
        />
    } else {
        return <Image source={IMAGES?.profilePerson}
        style={styles?.images}
        />
    }
    }

    /**  step: 03
      * optional: 02
      */
    function renderFileUri() {
        if (imageState.fileUri) {
            return <Image
            source={{ uri: imageState?.fileUri }}
            style={styles?.images}
            />
        } else {
            return <Image
            source={IMAGES?.profilePerson}
            style={styles?.images}
            />
        }
    }  
    

    // google sign up
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
            const subscriber = 
            firestore()
            .collection('Users')
            .doc(uid)
            .get().then(doc => {
                if ( doc?.exists) {
                        console.log('Document data:', doc?.data());
                        alert("Sign in, already you have an account!")
                        if(props?.isSignIn) {
                            //TODO: do somethings with sign-in
                            console.log("GOOGLE: sign-in successfully");
                            setloggedIn(true)
                        }

                           
                    } else {
                         //// doc.data() will be undefined in this case
                        console.log('No such document!');
                        if (!props?.isSignIn) {
                         //TODO: do somethings with sign-up
                        
                            // firestore: create new user
                            firestore()
                            .collection('Users')
                            .doc(uid)
                            .set({
                                uid: uid,
                                displayName: displayName,
                                email: email,
                                photoURL: photoURL,
                                phoneNumber: phoneNumber,
                            })
                            .then(() => {
                                console.log("GOOGLE: sign-up successfully");
                                setloggedIn(true)
                                navigation.goBack();
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
        {/* header section: logo name */}
        <Text fontSize="5xl" style={styles?.textLogo}>Inxtagram</Text>
        {/* <EmptyView style={{marginTop: dimensions.heightLevel1}}/> */}
        <Text fontSize="lg">Sign up to see photos and videos from your friends.</Text>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* button: facebook sign up button */}
        <Button 
            w="90%" 
            style={styles?.button}
            onPress={() => GoogleSignInOutHandler({isSignIn: false})}
        >
            Sign up with Google
        </Button>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* section: horizontal line with text */}
        <View style={styles?.hrLine}>
            <Text fontSize="sm" style={styles?.hrText}>OR</Text>
        </View>

        <EmptyView style={{marginTop: dimensions.heightLevel2}}/>

        {/* section: input fields */}
        {/* TODO: create and save userId - <usege> display only*/}

        <TouchableOpacity onPress={selectImageHandler}>
            {renderFileUri()}
        </TouchableOpacity>
        
        <EmptyView style={{marginTop: dimensions.heightLevel1}}/>

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


        
        {/* footer: sign in */}
        <View style={styles?.footer}>
            <Text fontSize="sm">Have an account? </Text>
            <TouchableOpacity
             onPress={() => navigation.goBack()}
            >
                <Text fontSize="sm" style={{color: colors?.blue}}>Sign in.</Text>
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
    },

    //// image Picker
    images: {
        width: dimensions?.heightLevel5,
        height: dimensions?.heightLevel5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors?.fbBlue
    }
});


export default SignUpScreen;
