import { Center } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { newsPost15, people15 } from '../../@fake-data/index';
import HomeHeader from '../../components/home/HomeHeader';
import NewsComponent from '../../components/home/NewsComponent';
import StatusComponent from '../../components/home/StatusComponent';
import { colors, dimensions } from '../../configurations/constants';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
    const [dataList, setDataList] = React.useState([]);

    // React.useEffect( () => {  
    //     // // observe state
    //     // const subscriber = firestore().collection('NewsFeed')
    //     // // .orderBy('date', 'desc')
    //     //     .onSnapshot( async documentSnapshot => {
               
    //     //          await documentSnapshot.forEach(snapshot => {
    //     //             // console.log(snapshot._data)
    //     //             setDataList([...dataList, snapshot._data ])
    //     //         });

    //     //         await setDataList([...dataList].sort(function (a, b) {
    //     //             return a.date - b.date;
    //     //         }))
    //     //     })

    //     // // Stop listening for updates when no longer required
    //     // return () => subscriber();
    // }, []);
  
    React.useEffect(() => {
        const subscriber = firestore()
          .collection('NewsFeed')
          .orderBy("date", "desc")
          .onSnapshot(onResult, onError);
    
        // Stop listening for updates when no longer required
        return () => subscriber();
      }, []);


      async function onResult(QuerySnapshot) {
        console.log('Got Users collection result.', QuerySnapshot._docs.length);
        let resultList = []
         await QuerySnapshot._docs.map(data => {
            console.log(data._data.date);
            resultList.push(data._data)
        });

        // await resultList.sort(function (a, b) {
        //     return a.date - b.date;
        // })

        setDataList(resultList)
      }
      
      function onError(error) {
        console.error(error);
      }


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
                // data={newsPost15}
                data={dataList}
                keyExtractor={(item) => item.date}
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
