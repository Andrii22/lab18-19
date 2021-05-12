import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { fetchData } from '../src/api';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  },

  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 2,
    margin: 2,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'lightgoldenrodyellow',
  },
  img: {
    flexGrow: 1,
    width: 300,
    height: 466,
    borderRadius: 10,
    alignSelf: 'center',
  },
  ratings: {
    fontSize: 16,
    textAlign: 'left',
    padding: 2,
    margin: 2,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'lightblue',
  }
});

const dataBase = 0;

const MovieScreen = ({ navigation, route }) => {
  const data = fetchData(`www.omdbapi.com/?i=${route.params.movieID}&apikey=c1be4d3b`);
  return(
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.screen}>
        <Image
          style={styles.img}
          source={{ uri: `${data['Poster']}` }}
        />

        <View>
          <View>
            <Text style={[styles.text]}>{data['Title']}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.text]}>
              {'Year: ' + data['Year']}
            </Text>
            <Text style={[styles.text]}>
              {'Rated: ' + data['Rated']}
            </Text>
          </View>
        </View>

        <Text style={styles.text}>
          {'Released: ' + data['Released']}
        </Text>
        <Text style={styles.text}>
          {'Genre: ' + data['Genre']}
        </Text>
        <Text style={styles.text}>
          {'Director: ' + data['Director']}
        </Text>
        <Text style={styles.text}>
          {'Actors: ' + data['Actors']}
        </Text>
        <Text style={styles.text}>
          {'Plot: ' + data['Plot']}
        </Text>
        <Text style={styles.text}>
          {'Language: ' + data['Language']}
        </Text>
        <Text style={styles.text}>
          {'Country: ' + data['Country']}
        </Text>
        <View style={{marginTop: 10 ,flexGrow: 1}}>
            <Text style={[styles.text,{textAlign:"center", fontSize: 20}]}>
            Ratings
          </Text>
          <Text style={styles.ratings}>{data['Ratings'][0]['Source']}</Text>
          <View
            style={{
              width: `${+data['Ratings'][0]['Value'].substr(0, 3) * 10}%`,
              backgroundColor: 'red',
              textAlign:"center",
              borderWidth: 1,
              marginHorizontal: 2,
            }}>
            <Text style={{color: "white"}}>{data['Ratings'][0]['Value']}</Text>
          </View>

          <Text style={styles.ratings}>{data['Ratings'][1]['Source']}</Text>
          <View
            style={{
              width: `${data['Ratings'][1]['Value']}`,
              backgroundColor: 'blue',
              textAlign:"center",
              borderWidth: 1,
              marginHorizontal: 2,
            }}>
            <Text style={{color: "white"}}>{data['Ratings'][1]['Value']}</Text>
          </View>

          <Text style={styles.ratings}>{data['Ratings'][2]['Source']}</Text>
          <View
            style={{
              width: `${data['Ratings'][2]['Value'].substr(0,2)}%`,
              backgroundColor: 'green',
              textAlign:"center",
              borderWidth: 1,
              marginHorizontal: 2,
            }}>
            <Text style={{color: "white"}}>{data['Ratings'][2]['Value']}</Text>
          </View>
        </View>
        
      </View>
    </ScrollView>
  </View>
);
}

export default MovieScreen;
