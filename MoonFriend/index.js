/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView
} from 'react-native';

var height=Dimensions.get('window').height-55;

class MoonFriend extends Component {
    render(){
        return (
           <View>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>月亮之友</Text>
              </View>
              <View style={styles.container}>
                <WebView 
                  contentInset={{top:-28}}
                  style={{height:height}}
                  source={{uri:'http://mallapi.bluemoon.com.cn/App/ylzy.html'}}/>
              </View>
          </View>
        );
    }
  
}
const styles = StyleSheet.create({
    titleView:{
        backgroundColor: '#0058f1',
        paddingTop:30,
        paddingBottom:10
    },
    titleText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight:'bold',
        flex:1,
        fontSize:16
    },
    container:{
      flex:1,

    }
});


module.exports = MoonFriend;