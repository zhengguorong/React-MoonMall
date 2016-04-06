var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} = React;

var Util = require('../common/util');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            buyCount: '1'
        }
    },
    render: function() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this._reduce}>
                    <View style={[styles.redueBtn, this.props.size == 'big' ? styles.big : styles.min]}>
                        <Text style={[styles.actionSize, this.props.size == 'big' ? styles.bigFont : styles.minFont]}>-</Text>
                    </View>
                </TouchableOpacity>
                <TextInput keyboardType={'numeric'} maxLength={100} value={this.state.buyCount} style={[styles.count,this.props.size == 'big' ? styles.bigCount : styles.minCount]}/>
                <TouchableOpacity onPress={this._add}>
                    <View style={[styles.addBtn, this.props.size == 'big' ? styles.big : styles.min]}>
                        <Text style={[styles.actionSize, this.props.size == 'big' ? styles.bigFont : styles.minFont]}>+</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    },
    _add: function() {
        var result = Number(this.state.buyCount) + 1
        this.setState({
            buyCount: result.toString()
        })
    },
    _reduce: function() {
        if (this.state.buyCount === '1') {
            return;
        }
        var result = Number(this.state.buyCount) - 1
        this.setState({
            buyCount: result.toString()
        })
    },
})
var styles = StyleSheet.create({
    redueBtn: {
        width: 30,
        height: 30,
        backgroundColor: '#f9fafa',
        borderBottomLeftRadius: 2,
        borderTopLeftRadius: 2,
        borderColor: '#b5b5b5',
        justifyContent: 'center',
        borderWidth: Util.pixel,
        alignItems: 'center'
    },
    addBtn: {
        backgroundColor: '#f9fafa',
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2,
        borderColor: '#b5b5b5',
        justifyContent: 'center',
        borderWidth: Util.pixel,
        alignItems: 'center'
    },
    count: {

        textAlign: 'center',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#b5b5b5',
        borderWidth: Util.pixel
    },
    bigCount: {
        width: 40,
        height: 30,
    },
    minCount: {
        width: 30,
        height: 20,
        fontSize:14,
    },
    actionSize: {
        color: '#888888',
    },
    big: {
        width: 30,
        height: 30
    },
    bigFont: {
        fontSize: 20,
    },
    min: {
        width: 20,
        height: 20,
    },
    minFont: {
        fontSize: 15,
    }
})