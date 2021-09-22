import { Center } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { newsPost15, people15 } from '../../@fake-data/index';
import HomeHeader from '../../components/home/HomeHeader';
import NewsComponent from '../../components/home/NewsComponent';
import StatusComponent from '../../components/home/StatusComponent';
import { colors, dimensions } from '../../configurations/constants';

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
                maxToRenderPerBatch={10}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={people15}
                ListFooterComponent={<View style={{width:dimensions?.heightLevel4 }}></View>}
                renderItem={({ item }) => (
                <StatusComponent item={item} />
                )}
                keyExtractor={(item) => item.id}
                />
            </View>

             {/* container: news feed */}
             <Center>
                <FlatList
                refreshing={true}
                maxToRenderPerBatch={5}
                showsVerticalScrollIndicator={false}
                data={newsPost15}
                keyExtractor={(item) => item.id}
                onEndReached={() => console.log("FlatList End.")}
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

});

export default HomeScreen;
