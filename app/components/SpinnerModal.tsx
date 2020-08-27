import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View, Text} from 'react-native';

import {useNetInfo} from '@react-native-community/netinfo';

interface ISpinnerModal {
    modalVisible: boolean;
}

const SpinnerModal = ({modalVisible}: ISpinnerModal) => {
    const netInfo = useNetInfo();

    const renderDisclaimer = () => {
        if (netInfo.isInternetReachable) {
            return null;
        }
        return (
            <View style={Styles.disclaimerContainer}>
                <Text style={Styles.disclaimerText}>
                    We can't load the movies as your internet connectivity is
                    currently not optimum
                </Text>
            </View>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {}}>
            <View style={[Styles.centerIt, Styles.modalContainer]}>
                <View style={[Styles.centerIt, Styles.activityBox]}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
                {renderDisclaimer()}
            </View>
        </Modal>
    );
};

const Styles = StyleSheet.create({
    centerIt: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
    },
    activityBox: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    disclaimerContainer: {
        width: '70%',
        marginVertical: 10,
    },
    disclaimerText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SpinnerModal;
