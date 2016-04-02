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
    render: function() {
        var initObj = this.props.initObj;
        return (

            <View style={styles.titleView}>
                <View style={styles.leftBtn}>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={this._pop}>
                        <Icon/>
                        <Text style={styles.fontFFF}>{initObj.backName}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleText}>{initObj.title}</Text>
                <View style={styles.rightBtn}><Text></Text></View>
            </View>
        );
    },

    _pop: function() {
        this.props.navigator.pop();
    }
});

var styles = StyleSheet.create({
    titleView: {
        backgroundColor: '#0058f1',
        paddingTop: 30,
        paddingBottom: 5,
        height:60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    leftBtn:{
        width:40,
    },
    rightBtn:{
        width:40,
    },
    fontFFF:{
        color:'#FFFFFF',
        fontSize:14
    },
    font000:{
        backgroundColor:'#000'
    }
});

