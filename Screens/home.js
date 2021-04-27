import React from 'react';
import { FlatList } from 'react-native';
import {Alert, Text, View,SafeAreaView, SafeAreaViewComponent,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {axios} from 'axios'
export default class HomeScreen extends React.Component{
constructor(props){
    super(props)
    this.state={
        list_data:[],
        url:'http://localhost:5000/',
        
    }
}


getData= async()=>{
const url = await this.state.url
axios
.get(url)
.then(response=>{
    return this.setState({
        list_data:response.data.data
    })
})
.catch(err=>{
    Alert.alert(err.message);
})

}

renderItem=({item,index})=>(
<ListItem
key={index}
title={`planet:${item.name}`}
subtitle = {`distance from earth:${item.distancefromearth}`}
titleStyle = {styles.title}
containerStyle = {styles.list_container}
bottomDivider
chevron
onPress={()=>{this.props.navigation.navigate("Details",{planet_name:item.name})}}
/>

)
keyExtractor = (item,index)=>item.toString()


componentDidMount(){
    this.getData();
}
    render(){
        const {list_data} = this.state
        if(list_data.length === 0){
            return (<View style={styles.emptyContainer} >
                <Text>
                    Loading.....
                </Text>
            </View>
            )
        }
        return(
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>
                    Planet World
                    </Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data = {this.state.list_data}
                    renderItem = {this.renderItem}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });