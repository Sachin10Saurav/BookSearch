import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import Home from "./screens/home.js"
import Search from "./screens/search.js"
import Fav from "./screens/results.js"
import res from "./screens/favourites.js"
import { NativeRouter, Switch, Route } from "react-router-native";
export default function App() {
  const image = require("./assets/back.jpg")
  return (
    <View style={styles.droidSafeArea}>
      <ImageBackground source={image} style={styles.image}>
      <NativeRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Search" component={Search} />
            <Route exact path="/Search/Fav" component={Fav} />
            <Route exact path="/Search/res" component={res} />
          </Switch>
      </NativeRouter>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
