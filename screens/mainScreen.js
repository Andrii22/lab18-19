import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchData } from '../src/api';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  screen: {
    opacity: 0.5,
    backgroundColor: '#000000',
  },
  text:{
    fontSize: 20
  },
  img: {
    width: 300,
    height: 466,
    borderRadius: 20,
    marginHorizontal: 'auto',
  },
  touchElem: {
    marginVertical: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  input: {
    margingTop: Constants.statusBarHeight + 20,
    width: '100%',
    borderColor: 'black',
    height: 30,

    borderWidth: 1,
  },
});
const url = 'http://www.omdbapi.com/?';
const apiKey = "&apikey=c1be4d3b";

class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: 'star', dataBase: [], isMount: false, isNotFind: false};
  }

 findResult(text){
   if(text.length > 2){
     this.getMovie(text);
     this.setState({value: text});  
   }
   
 }

 componentDidMount(){
   this.getMovie();
 }

 getMovie = async(value = this.state.value) => {
   const data = await fetchData(`${url}s=${value}${apiKey}`);
   if(data["Error"] == "Movie not found!" || data["Error"] == "Too many results."){
      this.setState({isNotFind: true});
     console.log("Movie not found!");
   }
   else{
    this.setState({dataBase: data, isMount: true});
   }
   
 }

  render() {
    if(this.state.isMount == true){
      return (
        <View style={styles.container}>
          <ScrollView>
            <TextInput style={styles.input} onChangeText={(text) => this.findResult(text)}/>
            {
              this.state.dataBase['Search'].map((object) => (
                <TouchableOpacity
                  style={styles.touchElem}
                  onPress={() => {
                    this.props.navigation.navigate('Movie', { movieID: object["imdbID"] });
                  }}>
                  <Image
                    style={styles.img}
                    source={{ uri: `${object['Poster']}` }}
                  />
                </TouchableOpacity>
              ))
              
            }
          </ScrollView>
        </View>
      );
    }
    else if(this.state.isNotFind == true || this.state.isMount == false){
      return(
        <View style={styles.container}>
          <TextInput style={styles.input} onChangeText={(text) => this.findResult(text)}/>
          <Text  style={styles.text}>Movie is not found!</Text>
        </View>
      );
    }
  }
}
export default MainScreen;
