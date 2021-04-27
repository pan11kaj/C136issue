import React from 'react';
import { FlatList } from 'react-native';
import {Alert, Text, View,SafeAreaView, SafeAreaViewComponent} from 'react-native';
import {ListItem,Card,Icon} from 'react-native-elements';
import axios from 'axios'
import { StyleSheet } from 'react-native';

export default class DetailScreen extends React.Component{
constructor(){
    super()
    this.state={
        details:{},
        image_path:"",
        url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
        "planet_name"
      )}`
    }
}
getDetails=()=>{
    const {url} = this.state;
    axios.get(url)
    .then(response=>{
        this.setdetails(response.data.data)
    })
    .catch(error=>{
        Alert.alert(error.message)
    })
}
setdetails = planetdetails=>{
    const planettype = planetdetails.planet_type;
    let image_path = "";
    switch(planettype){
        case "Gas Giant":
            image_path = require('../assets/images/gas_giant.png')
        case "Terrestrial":
            image_path = require('../assets/images/terrestrial.png')
        case "Neptune Like":
            image_path = require('../assets/images/neptune_like.png')
        case "Super Earth":
            image_path = require('../assets/images/super_earth.png')
        default:
            image_path = require('../assets/images/gas_giant.png')

        }
    this.setState({
        details:planetdetails,
        image_path:image_path
    })
}
componentDidMount(){
    this.getDetails()
}

    render(){
        const {details,imagepath} = this.state;
        if (details.specifiactions){
            return (
                <View style={styles.container}>
                    <Card title ={details.name} image={imagepath} imageProps={{resizeMode:"contain",width:"100%"}}>
                    <View>
              <Text style={StyleSheet.cardItem}>
                  {
                      `Distance From Earth : ${details.distanceFromEarth}`
                      
                  }
              </Text>
            <Text style={StyleSheet.cardItem}>{`distance from sun: ${details.distance_from_there_sun}`}</Text>
            <Text style={StyleSheet.cardItem}>{`Gravity: ${details.gravity}`}</Text>
            <Text style={StyleSheet.cardItem}>{`Orbital Period: ${details.OrbitalPeriod}`}</Text>
            <Text style={StyleSheet.cardItem}>{`Orbital Speed: ${details.orbital_speed}`}</Text>
            <Text style={StyleSheet.cardItem}>{`Planet Mass: ${details.planet_mass}`}</Text>
            <Text style={StyleSheet.cardItem}>{`Planet Radius: ${details.planet_radius}`}</Text>
            <Text style={StyleSheet.cardItem}>{`planet Type: ${details.planet_type}`}</Text>
            
                    </View>
                    <View style={[styles.cardItem,{flexDirection:"column"}]}>
                    <Text>
                        {
                            details.specifications? 'Specifications: ' : ""
                        }
                        
                    </Text>
                        {
                            details.specifications.map((item,index)=>{
                                <Text key={index.toString()} style={{marginLeft:50}}>{item}</Text>
                            })
                        }
                    </View>
                    </Card>
                </View>
            
            )
            
        } return null;

    }
}
const styles = StyleSheet.create({
container:{
    flex:1
},
cardItem:{
    marginBottom:10
}
})