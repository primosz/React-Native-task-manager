import React, { useState, Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default class App extends Component {
    state={
       listData : new Array(
         {key: 1, name: 'Zadanie 1', status: 'To do'},
         {key: 2, name: 'Zadanie 2', status: 'To do'},
         {key: 3, name: 'Zadanie 3', status: 'Done'},
         {key: 4, name: 'Zadanie 4', status: 'To do'},
         {key: 5, name: 'Zadanie 5', status: 'To do'},
         {key: 6, name: 'Zadanie 6', status: 'To do'},
         {key: 7, name: 'Zadanie 7', status: 'To do'}
      )
          };
    

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

     renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>I am {data.item.name}, my status is {data.item.status}</Text>
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
      return (
        <View style={styles.container}>
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
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
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
});