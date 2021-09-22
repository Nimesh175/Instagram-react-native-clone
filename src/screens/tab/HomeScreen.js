import { Center, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { people15, newsPost15 } from '../../@fake-data/index';
import EmptyView from '../../components/EmptyView';
import HomeHeader from '../../components/home/HomeHeader';
import NewsComponent from '../../components/home/NewsComponent';
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

             {/* container: news feed */}
             <Center style={styles?.newsFeed}>
                <FlatList
                refreshing={true}
                showsVerticalScrollIndicator={false}
                data={newsPost15}
                keyExtractor={(item) => item.id}
                onEndReached={() => console.log("FF")}
                ListFooterComponent={<View style={{height:dimensions?.heightLevel10 * 1.5}}></View>}
                renderItem={({ item }) => (
                    <NewsComponent item={item} />
                )}
                />
            </Center>

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
        height: dimensions?.heightLevel5 * 1.6,
    },

    newsFeed: {

    }
});

export default HomeScreen;
