import React from 'react';
import {View} from 'react-native';

const EmptyView = (props) => (
    <View style={props && props.style ? {...props.style} : {}}></View>
)

export default EmptyView;
