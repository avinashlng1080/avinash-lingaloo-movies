import {FlatList} from 'react-native';
import React, {memo} from 'react';

const List = ({data, renderItem, ...props}) => {
    return (
        <FlatList
            bounces={false}
            contentInsetAdjustmentBehavior="automatic"
            data={data}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={renderItem}
            {...props}
        />
    );
};

export default memo(List);
