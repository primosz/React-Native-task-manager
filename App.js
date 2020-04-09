import React, { useState, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal,
    TextInput,
    Picker
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default class App extends Component {
    state={
       listData : new Array(
         {key: 1, name: 'Zadanie 1', status: 'To do', cat: 'Reminder', date: '10/04/20'},
         {key: 2, name: 'Zadanie 2', status: 'To do', cat: 'Reminder', date: '10/04/20'},
         {key: 3, name: 'Zadanie 3', status: 'Done', cat: 'Meeting', date: '10/04/20'},
         {key: 4, name: 'Zadanie 4', status: 'To do', cat: 'Reminder', date: '10/04/20'},
         {key: 5, name: 'Zadanie 5', status: 'To do', cat: 'Assignment', date: '10/04/20'},
         {key: 6, name: 'Zadanie 6', status: 'To do', cat: 'Reminder', date: '10/04/20'},
         {key: 7, name: 'Zadanie 7', status: 'To do', cat: 'Reminder', date: '10/04/20'}
      ),
      modalVisible: false,
      currentElem: {key: 1, name: 'Zadanie 1', status: 'To do', cat: 'Reminder', date: '10/04/20'}
        };
    

    setModalVisible = (visible, currentElIndex) => {
        this.setState({
            modalVisible: visible,
            currentElem: this.getElemData(currentElIndex)
        });
    }

    save = () => {        
        let changedList = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.key === this.state.currentElem.key);
        changedList[prevIndex] = this.state.currentElem;
        this.setState({listData: changedList});
        this.setModalVisible(false, 1);
    }

    handleCloseRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (rowMap, rowKey) => {
        this.handleCloseRow(rowMap, rowKey);
        const newData = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        this.setState({listData: newData});
    };

    markDoneRow = (rowMap, rowKey) => {
        this.handleCloseRow(rowMap, rowKey);
        const newData = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.key === rowKey);
        newData[prevIndex].status = "Done";
        this.setState({listData: newData});
    };

     onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    getElemData = (key) => {
        const index = this.state.listData.findIndex(item => item.key === key);
        return this.state.listData[index];
    };

     onChangeNameInput = (event) => {
         let changedElem = this.state.currentElem;
         changedElem.name = event
        this.setState({
             currentElem: changedElem
         })
     }

     onStatusChange = (itemValue, itemIndex) => {
         let changedElem = this.state.currentElem;
         changedElem.status = itemValue;
         this.setState({
             currentElem: changedElem
         })
     }

    onChangeDateInput = (event) => {
         let changedElem = this.state.currentElem;
         changedElem.date = event
         this.setState({
             currentElem: changedElem
         })
     }

   onCatChange = (itemValue, itemIndex) => {
       let changedElem = this.state.currentElem;
       changedElem.cat = itemValue;
       this.setState({
           currentElem: changedElem
       })
   }

     renderItem = data => (
        <TouchableHighlight
            onPress={() => this.setModalVisible(true, data.item.key)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style = {styles.container2}>
              <Text style={styles.icon}><Icon name="book" color="#606060" size={30}  /></Text>
                <Text style={styles.text}>                   
                    I am {data.item.name}, my status is {data.item.status}
                </Text>
            </View>
        </TouchableHighlight>
    );

     renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
             <TouchableOpacity
                style={[styles.backLeftBtn]}
                onPress={() => this.deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.handleCloseRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.markDoneRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Done</Text>
            </TouchableOpacity>
        </View>
    );

    render(){
    const { modalVisible } = this.state;
      return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Name</Text>
                    <TextInput
                        value={this.state.currentElem.name}
                        style={styles.input}
                        onChangeText={(this.onChangeNameInput)}
                        underlineColorAndroid = 'blue'
                        selectionColor = 'blue'
                        />
                    <Text style={styles.modalText}>Status</Text>
                     <Picker
                        style={styles.picker}
                        selectedValue={this.state.currentElem.status}
                        onValueChange={(itemValue, itemIndex) => this.onStatusChange(itemValue, itemIndex)}>
                            <Picker.Item label="To Do" value="To do" />
                            <Picker.Item label="Done" value="Done" />
                    </Picker>
                    <Text style={styles.modalText}>Due Date</Text>
                    <TextInput
                        value={this.state.currentElem.date}
                        style={styles.input}
                        onChangeText={this.onChangeDateInput}
                        underlineColorAndroid = 'blue'
                        selectionColor = 'blue'
                        />
                    <Text style={styles.modalText}>Category</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.currentElem.cat}
                        onValueChange={(itemValue, itemIndex) => this.onCatChange(itemValue, itemIndex)}>
                            <Picker.Item label="Reminder" value="Reminder" />
                            <Picker.Item label="Meeting" value="Meeting" />
                            <Picker.Item label="Assignment" value="Assignment" />
                    </Picker>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                        this.save();
                        }}
                    >
                        <Text style={styles.textStyle}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </Modal>

            <SwipeListView
                data={this.state.listData}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={this.onRowDidOpen}
            />
        </View>
    );
      }
}

const styles = StyleSheet.create({
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
        fontFamily: 'Roboto' ,
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
      margin:10,
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
        elevation: 2
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
        margin: 30,
        fontSize: 30,
        width: '50%'
    },
  modalText: {
        marginBottom: 0,
        textAlign: "center"
  }
});