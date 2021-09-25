import { Center, TextArea, Button } from 'native-base';
import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Avatar} from '../../components/ImageVideoPickerV1/Avatar';
import { dimensions, colors, fontFamilies, fontSizes } from '../../configurations/constants';
import ImgToBase64 from 'react-native-image-base64';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';

const PostScreen = ({navigation}) => {

    const [textAreaValue, setTextAreaValue] = React.useState("");
    const [loader, setLoader] = React.useState(false);
    const [imageState, setImageState] = React.useState({
        base64String: null,
        base64Type: null,
    })


    const onAvatarChange = (image) => {
        console.log(image.path);
        console.log(image.mime);

        ImgToBase64.getBase64String(image.path)
        .then(base64String => {
            setImageState({
                ...imageState,
                base64String: base64String,
                base64Type: image.mime,
            })
        })
        .catch(err => console.log(err));
      };

      
      const sendPostHandler = () => {
          if((imageState.base64String && imageState.base64Type) || textAreaValue ) {
                setLoader(true)
                //firestore: save new user
                firestore()
                .collection('NewsFeed')
                .add({
                    date: new Date(),
                    base64String: imageState?.base64String,
                    base64Type: imageState?.base64Type,
                    message: textAreaValue,
                })
                .then(() => {
                    setLoader(false)
                    console.log("send...");
                    alert("sent.")
                })
                .catch(error => {
                    setLoader(false)
                    console.log("ERROR: post not added!")});
            }          
      }

      const demoValueControlledTextArea = (e) => {
        setTextAreaValue(e.currentTarget.value)
      }

    return (
        <>
        <Loader isLoading={loader} />
        <Center flex={1} style={styles.container}>
            <View style={styles?.avatar}>
                <Avatar
                onChange={onAvatarChange}
                source={require('../../components/ImageVideoPickerV1/avatar-placeholder.png')}
                />
            </View>


            <TextInput
                style={styles?.textArea}
                onChangeText={data => setTextAreaValue(data)}
                value={textAreaValue}
                placeholder="Message here"
            />
            {/* <TextArea
                style={styles?.textArea}
                value={textAreaValue}
                onChange={e => {
                    setTextAreaValue(e.currentTarget?.value)
                    console.log(e.currentTarget.value);
                }}
                placeholder="Message here"
                w={{
                    base: "75%",
                    md: "25%",
                }}
            /> */}


          <Button
            w="50%"
            size="md"
            onPress={sendPostHandler}
            variant="subtle"
            colorScheme="primary" // onPress={() => console.log('hello world')}
          >
            POST
          </Button>
        </Center>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors?.white,
    },

    avatar: {
        width: dimensions?.widthLevel5,
        height: dimensions?.widthLevel5,
        borderRadius: 20,
        backgroundColor: colors?.black25,
    },

    textArea: {
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0.03)",
        marginVertical: dimensions?.paddingLevel2,
        borderRadius: 10,
        fontFamily: fontFamilies?.robotoItalic,
        fontSize: fontSizes?.fontSmallPlus,
        paddingHorizontal: 3,
        width: "75%"
    },
});

export default PostScreen;
