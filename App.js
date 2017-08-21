import React from 'react';
import { StyleSheet, Text, View, ListView, Image, 
  Button,
  Dimensions,
  ScrollView, TouchableHighlight } from 'react-native';

  const contactData = require('./contact.json');
  
export default class App extends React.Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {viewName:"list",dataSource: ds.cloneWithRows(contactData),
                  firstName:'',lastName:'',organization:'',address:''};
    this._renderRow = this._renderRow.bind(this);
  }


  getPressRow(item){
    this.setState({viewName:'detail'})
    this.setState({firstName:item.firstName,lastName:item.lastName,organization:item.organization,address:item.address})
  }

  componentDidMount() {
   
  }

  _renderRow(rowData) {
       return (<TouchableHighlight onPress={() => this.getPressRow(rowData)} style={{backgroundColor: '#8BC34A'}}>
         <View style={{backgroundColor: '#2196F3',borderBottomColor:'#eee',margin:5}}>
        <Text style={{ fontSize:18,marginTop:10 }}>{rowData.firstName} {rowData.lastName} - {rowData.organization}</Text>
        </View>
      </TouchableHighlight>);
  }

  render() {
    let toReturn = <Text>Not Found</Text>;
    if(this.state.viewName === 'list')
    {
        toReturn = (
          <View>
            <View ><Text style={{ fontSize:24,fontWeight:'bold',justifyContent: 'center' }}>Contact List</Text></View>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={ this._renderRow } />
          </View>
        );
    }
    else if(this.state.viewName === 'detail')
    {
        toReturn = (
        <View>
          <Button
            onPress={() => this.setState({viewName:'list'})}
            title="<<back"
            color="#045adb"
            accessibilityLabel="<<back"
          />
            <View ><Text style={{ fontSize:24,fontWeight:'bold',justifyContent: 'center' }}>DETAIL</Text></View>
            <View>
            <Text>First Name : {this.state.firstName}</Text>
            <Text>Last Name : {this.state.lastName}</Text>
            <Text>Organization : {this.state.organization}</Text>
            <Text>Address : {this.state.address}</Text>
        </View>
          </View>);
    }
    return (
      // Handle navigation between screens
      <View style={{padding:10,marginTop:30}}>
        {toReturn}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
