var React = require('react-native');
var Icon = require('./left_icon');
var Util = require('./../common/util');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity
  } = React;

module.exports = React.createClass({
  render: function(){
    var obj = this.props.initObj;
    return (
      <View style={[styles.header, styles.row, styles.center]}>
        <TouchableOpacity style={[styles.row,styles.center]} onPress={this._pop}>
          <Icon/>
          <Text style={styles.fontFFF}>{obj.backName}</Text>
        </TouchableOpacity>
        <View style={[styles.title, styles.center]}>
          <Text style={[styles.fontFFF, styles.titlePos]} numberOfLines={1}>{obj.title}</Text>
        </View>
      </View>
    );
  },

  _pop: function(){
    this.props.navigator.pop();
  }
});

var styles = StyleSheet.create({
  row:{
    flexDirection:'row'
  },
  header:{
    backgroundColor:'#0058f1',
    paddingTop:35,
    paddingBottom:10
  },
  fontFFF:{
    color:'#fff',
    fontSize:17,
    fontWeight:'bold'
  },
  title:{
    flex:1
  },
  titlePos:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight:'bold',
    flex:1,
    fontSize:30
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  }
});

