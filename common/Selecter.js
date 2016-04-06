var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback
} = React;

module.exports=React.createClass({
    getInitialState:function(){
      return {
          selected:this.props.selected||false
      }  
    },
    render:function(){
        return (
            <View>
                <Image source={require("image!selected")}/>
            </View>
        )
    }
})