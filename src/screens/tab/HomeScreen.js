import { Center, FlatList } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { people15 } from '../../@fake-data/index';
import HomeHeader from '../../components/home/HomeHeader';
import StatusComponent from '../../components/home/StatusComponent';
import {colors, dimensions, fontFamilies, fontSizes} from '../../configurations/constants';

const HomeScreen = ({navigation}) => {

    React.useEffect(() => {
        //
    },[])

   

    return (
        <View flex={1} style={styles?.container}>
            {/* seaction: Header */}
            <HomeHeader />

            {/* container: status bar */}
            <View style={styles?.statusbar}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={people15}
                renderItem={({ item }) => (
                <StatusComponent item={item} />
                )}
                keyExtractor={(item) => item.id}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors?.white,
    },
    statusbar: {
        borderBottomColor: colors?.black25,
        borderBottomWidth: 1,
        // backgroundColor: "green",
        height: dimensions?.heightLevel5 * 1.5,
    }
});

export default HomeScreen;
