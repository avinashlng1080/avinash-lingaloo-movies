import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface ISpinnerModal {
    modalVisible: boolean;
}

const SpinnerModal = ({modalVisible}: ISpinnerModal) => {
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
});

export default SpinnerModal;
