import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal,
    TextInput,
    Picker
} from 'react-native';
import { styles } from './src/styles/styles.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import { getDateString, getIcon } from './src/helpers.js';
export default class App extends Component {
    state = {
        listData: new Array(
            { key: 1, name: 'Zadanie 1', desc: 'Description', status: 'Not done', cat: "Reminder", date: '2020-10-04' },
            { key: 2, name: 'Zadanie 2', desc: 'Description', status: 'Not done', cat: "Phone", date: '2020-10-04' },
            { key: 3, name: 'Zadanie 3', desc: 'Description', status: 'Done', cat: 'Meeting', date: '2020-10-04' },
            { key: 4, name: 'Zadanie 4', desc: 'Description', status: 'Not done', cat: 'Reminder', date: '2020-10-04' },
            { key: 5, name: 'Zadanie 5', desc: 'Description', status: 'Not done', cat: 'Assignment', date: '2020-10-04' },
            { key: 6, name: 'Zadanie 6', desc: 'Description', status: 'Not done', cat: 'Reminder', date: '2020-10-04' },
            { key: 7, name: 'Zadanie 7', desc: 'Description', status: 'Not done', cat: 'Reminder', date: '2020-10-04' }
        ),
        modalVisible: false,
        currentElem: { key: 1, name: 'Zadanie 1', status: 'Not done', cat: 'Reminder', date: '10/04/20' },
        addMode: false
    };


    setModalVisible = (visible, currentElIndex, addingMode) => {
        if (addingMode) {
            let newElem = {
                key: null,
                name: 'New item',
                status: 'To do',
                cat: 'Reminder',
                date: getDateString()
            }
            this.setState({
                modalVisible: true,
                currentElem: newElem,
                addMode: true
            });
        }
        else {
            this.setState({
                modalVisible: visible,
                currentElem: this.getElemData(currentElIndex)
            });
        }
    }

    save = () => {
        let changedList = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.key === this.state.currentElem.key);
        changedList[prevIndex] = this.state.currentElem;
        this.setState({ listData: changedList });
        this.setModalVisible(false, 1, false);
    }

    addNewElem = () => {
        if (this.state.currentElem.name.length > 0) {
            let changedList = [...this.state.listData];
            const newIndex = changedList[changedList.length - 1].key + 1;
            this.state.currentElem.key = newIndex;
            changedList.push(this.state.currentElem);
            this.setState({ listData: changedList, addMode: false });
            this.setModalVisible(false, 1, false);
        }
        else alert('Provide a name for task!');
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
        this.setState({ listData: newData });
    };

    markDoneRow = (rowMap, rowKey) => {
        this.handleCloseRow(rowMap, rowKey);
        const newData = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.key === rowKey);
        newData[prevIndex].status = "Done";
        this.setState({ listData: newData });
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

    onChangeDescInput = (event) => {
        let changedElem = this.state.currentElem;
        changedElem.desc = event
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
            onPress={() => this.setModalVisible(true, data.item.key, false)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={styles.container2}>
                <Text style={styles.icon}><Icon name={getIcon(data.item.cat)} color="#606060" size={30} /></Text>
                <Text style={styles.text}>
                    {data.item.name}, {data.item.date},  {data.item.status}
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

    render() {
        const { modalVisible } = this.state;
        return (

            <View style={styles.container}>
                <ToolbarAndroid
                    title="Task Manager"
                    style={styles.toolbar}
                    actions={[
                        { title: 'Button', icon: require('./add.png'), show: 'always' },
                    ]}
                    onActionSelected={() => this.setModalVisible(true, 0, true)}

                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false, 1, false);
                        this.setState({ addMode: false });
                        console.log("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Name</Text>
                            <TextInput
                                value={this.state.currentElem.name}
                                style={styles.input}
                                onChangeText={(this.onChangeNameInput)}
                                underlineColorAndroid='blue'
                                selectionColor='blue'
                            />
                            <Text style={styles.modalText}>Description</Text>
                            <TextInput
                                value={this.state.currentElem.desc}
                                style={styles.input}
                                onChangeText={(this.onChangeDescInput)}
                                underlineColorAndroid='green'
                                selectionColor='green'
                                multiline={true}
                            />
                            <Text style={styles.modalText}>Status</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.currentElem.status}
                                onValueChange={(itemValue, itemIndex) => this.onStatusChange(itemValue, itemIndex)}>
                                <Picker.Item label="Not done" value="Not done" />
                                <Picker.Item label="Done" value="Done" />
                            </Picker>
                            <Text style={styles.modalText}>Due Date</Text>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.currentElem.date}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                minDate="2020-01-01"
                                maxDate="2021-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: -4,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: -10
                                    }
                                }}
                                onDateChange={this.onChangeDateInput}
                            />
                            <Text style={styles.modalText}>Category</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.currentElem.cat}
                                onValueChange={(itemValue, itemIndex) => this.onCatChange(itemValue, itemIndex)}>
                                <Picker.Item label="Reminder" value="Reminder" />
                                <Picker.Item label="Meeting" value="Meeting" />
                                <Picker.Item label="Assignment" value="Assignment" />
                                <Picker.Item label="To do" value="To do" />
                                <Picker.Item label="Phone" value="Phone" />
                            </Picker>
                            {!this.state.addMode ? <TouchableHighlight
                                style={{ ...styles.openButton }}
                                onPress={() => {
                                    this.save();
                                }}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableHighlight> : null}
                            {this.state.addMode ? <TouchableHighlight
                                visible={false}
                                style={{ ...styles.openButton }}
                                onPress={() => {
                                    this.addNewElem();
                                }}
                            >
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableHighlight> : null}
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