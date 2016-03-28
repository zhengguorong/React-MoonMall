/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView
} from 'react-native';

var webView = require('../common/webview');
var Util = require('../common/util');

class MoonHome extends Component {
    constructor(props){
        super(props);
    }

    navChange(state){
      if(state.url.indexOf('bm://')>-1){
        var openUrl=Util.getParam(state.url,'url');
        var title=Util.getParam(state.url,'title');
        this.props.navigator.push({
          component: webView,
          passProps:{
            backName: '',
            title: '月亮之家',
            source: {uri:openUrl}
          }
        });
      }
    }
    render(){
        return (
           <View>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>月亮之家</Text>
              </View>
              <View style={styles.container}>
                <WebView 
                  ref={'webView'}
                  contentInset={{top:-23}}
                  onLoadStart={function(data){console.log(data,"onLoadStart")}}
                  onError={function(data){console.log(data,"onError")}}
                  style={{width: Util.size.width, height:Util.size.height -50}}
                  onNavigationStateChange={this.navChange.bind(this)}
                  source={{uri:'http://mallapi.bluemoon.com.cn/App/zjyf.html'}}/>
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


module.exports = MoonHome;