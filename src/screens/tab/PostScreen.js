import { Center, TextArea, Button } from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar} from '../../components/ImageVideoPickerV1/Avatar';
import { dimensions, colors, fontFamilies, fontSizes } from '../../configurations/constants';

const PostScreen = ({navigation}) => {

    const [textAreaValue, setTextAreaValue] = React.useState('')

    const onAvatarChange = (image) => {
        console.log(image);
      };

    return (
        <Center flex={1} style={styles.container}>
            <View style={styles?.avatar}>
                <Avatar
                onChange={onAvatarChange}
                source={require('../../components/ImageVideoPickerV1/avatar-placeholder.png')}
                />
            </View>

            <TextArea
                style={styles?.textArea}
                value={textAreaValue}
                onChange={data => setTextAreaValue(data)}
                placeholder="Message here"
                w={{
                    base: "75%",
                    md: "25%",
                }}
            />


          <Button
            w="50%"
            size="md"
            variant="subtle"
            colorScheme="primary" // onPress={() => console.log('hello world')}
          >
            POST
          </Button>
        </Center>
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
    },
});

export default PostScreen;
