var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity,
    TouchableWithoutFeedback
} = React;
var Util = require('../common/util');
var ServerUrl = require('../common/server');
var Overlay = require('react-native-overlay');
var ProductList=require('./ProductList');


module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: ds.cloneWithRows([])
        };
    },
    componentDidMount: function() {
        this._getData();
    },
    render: function() {
        return (
            <Overlay isVisible={this.props.isVisible}>
                <View style={styles.container}>
                    <ScrollView>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            />
                    </ScrollView>
                </View>
            </Overlay>
        )
    },
    _renderRow: function(row) {
        return (
            <TouchableOpacity onPress={this._toProductList.bind(this, row.cid) }>
                <View>
                    <Text style={styles.rowText}>{row.name}</Text>
                    <View style={styles.line}></View>
                </View>
            </TouchableOpacity>
        )
    },
    _getData: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var that = this;
        Util.post(ServerUrl.mall_home_getCategory, { "categoryId": "123" }, function(data) {
            if (data && data.isSuccess) {
                that.setState({
                    dataSource: ds.cloneWithRows(data.categorys)
                })
            }
        }, function(err) {
            console.log(err)
        })
    },
    _toProductList: function(categoryId) {
        this.props.navigator.push({
            component: ProductList,
            passProps: {
                categoryId: categoryId,
                backName: '',
                title: '商品列表',
            }
        });
    }

})
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 6,
        top: 70,
        borderRadius: 4,
        width: 130,
        height: 265
    },
    rowContainer: {
        paddingLeft: 12,
        paddingTop: 15,
        paddingBottom: 15,
    },
    rowText: {
        fontSize: 14,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
    },
    line: {
        height: Util.pixel,
        backgroundColor: '#ebebeb'
    }

})