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
  TabBarIOS
} from 'react-native';

var MoonHome=require('./MoonHome/index');
var MoonFriend=require('./MoonFriend/index');
var Mall = require('./MoonMall/index');
var Cart = require('./MoonCart/Cart');
var Navigation = require('./common/navigation');

class MoonMall extends Component {
  constructor(props){
      super(props);
      this.state={
          selectedTab:'moonMall'
      }
  }
  render() {
    return (
        <TabBarIOS
            barTintColor='#fff'
            tintColor='#0058f1'>
            <TabBarIOS.Item
                title='月亮之家'
                selected={this.state.selectedTab==='moonHome'}
                icon={require("image!icon_home_normal")}
                selectedIcon={require("image!icon_home_selected")}
                onPress={() => {
                    this.setState({
                        selectedTab: 'moonHome'
                    });
                }}>
                 <Navigation component={MoonHome}/>
            </TabBarIOS.Item>
             <TabBarIOS.Item
                title='月亮之友'
                selected={this.state.selectedTab==='moonFriend'}
                icon={require("image!icon_friend_normal")}
                selectedIcon={require("image!icon_friend_selected")}
                onPress={() => {
                    this.setState({
                        selectedTab: 'moonFriend'
                    });
                }}>
                <MoonFriend></MoonFriend>
            </TabBarIOS.Item>
            <TabBarIOS.Item
                title='月亮商城'
                selected={this.state.selectedTab==='moonMall'}
                icon={require("image!icon_store_normal")}
                selectedIcon={require("image!icon_store_selected")}
                onPress={() => {
                    this.setState({
                        selectedTab: 'moonMall'
                    });
                }}>
                 <Navigation component={Mall}/>
            </TabBarIOS.Item>      
            <TabBarIOS.Item
                title='购物车'
                selected={this.state.selectedTab==='cart'}
                icon={require("image!icon_shop_normal")}
                selectedIcon={require("image!icon_shop_selected")}
                onPress={() => {
                    this.setState({
                        selectedTab: 'cart'
                    });
                }}>
                 <Navigation component={Cart}/>
            </TabBarIOS.Item>    
            <TabBarIOS.Item
                title='我的'
                selected={this.state.selectedTab==='memberCenter'}
                icon={require("image!icon_center_normal")}
                selectedIcon={require("image!icon_center_selected")}
                onPress={() => {
                    this.setState({
                        selectedTab: 'memberCenter'
                    });
                }}>
                <Text>月亮之家</Text>
            </TabBarIOS.Item>                                         
        </TabBarIOS>
    );
  }
  
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    titleView:{
        backgroundColor: '#0058f1',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'column'
    },
    titleText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight:'bold',
        flex:1,
        fontSize:16
    },
});


AppRegistry.registerComponent('MoonMall', () => MoonMall);
