var React = require('react-native');
var Util = require('./util');
var Header = require('./header');

var {
  WebView,
  View
  } = React;

module.exports = React.createClass({
  render: function(){
    return (
      <View>
        <Header
          navigator={this.props.navigator}
          initObj={{
            backName: this.props.backName,
            title: this.props.title
          }}/>
        <WebView
          contentInset={{top:-23}}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={true}
          style={{width: Util.size.width, height:Util.size.height -50}}
          source={this.props.source}></WebView>
      </View>
    );
  }
});
