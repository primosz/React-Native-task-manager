import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    container2: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        fontFamily: 'Roboto',
        fontWeight: '900'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'green',
        right: 0,
    },
    backLeftBtn: {
        backgroundColor: 'red',
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    icon: {
        margin: 10,
        alignSelf: "flex-start",
        position: 'absolute',
        top: 0,
        left: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        width: "50%"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        fontWeight: 'bold'
    },
    picker: {
        marginHorizontal: 30,
        marginBottom: 10,
        fontSize: 30,
        width: '50%'
    },
    toolbar: {
        backgroundColor: '#00ccff',
        height: 56,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    modalText: {
        marginBottom: 0,
        marginTop: 25,
        textAlign: "center"
    },
    tbIcon: {
        position: 'absolute',
        right: 0
    }
});