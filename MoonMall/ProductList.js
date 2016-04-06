var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity
} = React;
var Util = require('../common/util');
var ServerUrl = require('../common/server');
var Header = require('../common/header');
var Detail = require('./Detail');

module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        return {
            dataSource: ds.cloneWithRows([]),
            show: false
        }
    },
    componentDidMount: function() {
        this._getData();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Header initObj={this.props} navigator={this.props.navigator}></Header>
                <ScrollView style={styles.scrollView} contentInset={{bottom:50}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        style={{ backgroundColor: '#efefef' }}
                        contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}
                        />
                </ScrollView>
            </View>
        )
    },
    _getData: function() {
        var that = this;
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        Util.post(ServerUrl.mall_productlist_getList, { "orderField": "position", "orderType": "asc", "categoryId": "102", "pageSize": 10 }, function(data) {
            if (data && data.isSuccess) {
                that.setState({
                    dataSource: ds.cloneWithRows(data.items)
                })
            }
        }, function(err) {
            console.log(err)
        })
    },
    _renderRow: function(row) {
        return (
            <TouchableWithoutFeedback onPress={this._toDetail.bind(this, row.itemId) }>
                <View style={styles.productContainer}>
                    <Image style={styles.productImg} source={{ uri: row.imageVo.picUrl }}/>
                    <View><Text style={styles.productTitle}>{row.itemName}</Text></View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>￥{(row.memberPrice / 100).toFixed(2) }</Text>
                        <TouchableOpacity>
                            <View style={styles.addCartBtn}><Text style={styles.addCartText}>加入购物车</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    },
    _toDetail: function(itemId) {
        this.props.navigator.push({
            component: Detail,
            passProps: {
                itemId: itemId,
                backName: '',
                title: '商品详情',
            }
        });
    }

})
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    scrollView: {
        height: Util.size.height - 300,
    },
    productContainer: {
        backgroundColor: '#FFFFFF',
        width: 157,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
    },
    productImg: {
        width: 130,
        height: 130,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 4,
    },
    productTitle: {
        fontSize: 12,
        color: '#333',
        height: 28,
        marginLeft: 9,
        marginRight: 4
    },
    price: {
        fontSize: 13,
        color: '#ff4135'
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        marginLeft: 11,
        marginRight: 4,
        justifyContent: 'space-between'
    },
    addCartBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 61,
        height: 20,
        backgroundColor: '#ff4135',
        borderRadius: 2
    },
    addCartText: {
        fontSize: 10,
        color: '#FFFFFF'
    }
})