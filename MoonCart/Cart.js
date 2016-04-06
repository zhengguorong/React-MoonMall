var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} = React;

var Util = require('../common/util');
var ServerUrl = require('../common/server');
var Counter = require('../common/Counder');
var Selecter = require('../common/Selecter');

module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        return {
            dataSource: ds.cloneWithRows([]),
            totalMemberPrice:0,
            totalMarketPrice:0,
            totalPrice:0,
            discountFee:0,
            count:0
        }
    },
    componentDidMount: function() {
        this._getData();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>购物车</Text>
                </View>
                <ScrollView style={{ height: Util.size.height - 160 }} contentOffset={ { y: 20 }} contentInset={{ top: -20 }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        />
                    <View style={styles.line}></View>
                </ScrollView>
                <View style={styles.total}>
                    <Selecter/>
                    <Text style={styles.selectAllText}>全选</Text>
                    <View style={styles.priceInfo}>
                        <Text style={styles.needPay}>应付：￥{Util.getDisplayPrice(this.state.totalMemberPrice)}</Text>
                        <View style={styles.others}>
                            <Text style={styles.totalPrice}>总价：￥{Util.getDisplayPrice(this.state.totalMarketPrice)}</Text>
                            <Text style={styles.salePrice}>优惠：￥{Util.getDisplayPrice(this.state.discountFee)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.submitView}>
                        <Text style={styles.submitText}>结算（{this.state.count}）</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    },
    _getBuyCount:function(buyItems){
        var count=0;
        for(var i=0;i<buyItems.length;i++){
            count=buyItems[i].num+count;
        }
        return count;
    },
    _getData: function() {
        var that = this;
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        Util.post(ServerUrl.mall_cart_getList, { "token": "123" }, function(data) {
            if (data && data.isSuccess) {
                var count=that._getBuyCount(data.buyItems)
                that.setState({
                    dataSource: ds.cloneWithRows(data.buyItems),
                    totalMarketPrice:data.totalMarketPrice,
                    totalMemberPrice:data.totalMemberPrice,
                    discountFee:data.discountFee,
                    count:count
                })
            }
        }, function(err) {
            console.log(err)
        })
    },
    _renderRow: function(row) {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.checker}>
                    <Selecter/>
                </View>
                <View style={styles.prodcutImg}>
                    <Image style={{ flex: 1 }} source={{ uri: row.imageVo.picUrl }}/>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{row.itemName}</Text>
                    <Counter size='min'/>
                </View>
                <View style={styles.productPrice}>
                    <Text style={styles.memberPrice}>￥{Util.getDisplayPrice(row.memberPrice) }</Text>
                    <Text style={styles.marketPrice}>￥{Util.getDisplayPrice(row.marketPrice) }</Text>
                </View>
            </View>
        )
    }
})
var styles = StyleSheet.create({
    container: {
        //   flex:1
        backgroundColor: '#efefef'
    },
    titleView: {
        backgroundColor: '#0058f1',
        paddingTop: 30,
        paddingBottom: 10
    },
    titleText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 16
    },
    rowContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ebebeb',
        backgroundColor: '#fff'
    },
    checker: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginLeft: 10,
        marginRight: 9
    },
    prodcutImg: {
        width: 60,
        height: 60,
        borderWidth: Util.pixel,
        borderColor: '#ebebeb',
        borderRadius: 2,
    },
    productInfo: {
        marginLeft: 10,
    },
    productName: {
        fontSize: 13,
        color: '#333',
        marginBottom: 9,
        height: 30,
        width: 150
    },
    total: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        paddingLeft: 10,
    },
    selectAllText: {
        marginLeft: 10,
    },
    priceInfo: {
        marginLeft: 22,
    },
    needPay: {
        fontSize: 13,
        color: '#ff4315'
    },
    others: {
        flexDirection: 'row',
        marginTop: 6,
    },
    totalPrice: {
        fontSize: 11,
        color: '#ff4315'
    },
    salePrice: {
        fontSize: 10,
        color: '#ff4315',
        marginLeft: 10,
    },
    submitView: {
        backgroundColor: '#ff4315',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        height: 55
    },
    submitText: {
        color: '#fff',
    },
    line: {
        backgroundColor: '#d5d5d5',
        height: Util.pixel
    },
    memberPrice: {
        fontSize: 15,
        color: '#ff4315',
        marginBottom: 9
    },
    marketPrice: {
        fontSize: 12,
        color: '#999'
    }

})