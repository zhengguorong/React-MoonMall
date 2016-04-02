var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    LinkingIOS
} = React;
var Util = require('../common/util');
var ServerUrl = require('../common/server');
var Header = require('../common/header');
var Comment = require('./CommentList');
var Swiper = require('react-native-swiper')

module.exports = React.createClass({
    getInitialState: function() {
        return {
            curTab: 'productDetail',
            buyCount: '1',
            itemId:this.props.itemId,
            productInfo:{}
        }
    },
    componentDidMount: function() {
        this._getData();
    },
    render: function() {
        return (
            <View >
                <Header initObj={this.props} navigator={this.props.navigator}/>
                <ScrollView style={{ height: Util.size.height - 160 }}>
                    <View>
                        <Swiper height={240} style={styles.wrapper}
                            dot={<View style={{ backgroundColor: '#c7c7c7', width: 8, height: 8, borderRadius: 8, marginLeft: 6, marginRight: 6, }} />}
                            activeDot={<View style={{ backgroundColor: '#fc5500', width: 8, height: 8, borderRadius: 8, marginLeft: 6, marginRight: 6 }} />}
                            paginationStyle={{
                                bottom: 10
                            }}>
                            <View style={styles.slide}>
                                <Image style={styles.image} resizeMode={'contain'} source={{ uri: 'http://tmallapi.bluemoon.com.cn//upload/images/mall_product/test/80000267/ztjjsqbc.png' }}/>
                            </View>
                            <View style={[styles.slide]}>
                                <Image style={styles.image} resizeMode={'contain'} source={{ uri: 'http://tmallapi.bluemoon.com.cn//upload/images/mall_product/test/80000267/ztjjsqbc.png' }}/>
                            </View>
                        </Swiper>
                    </View>
                    <View style={[styles.line, styles.margin10]}></View>
                    <View style={styles.productInfoContainer}>
                        <Text style={{ color: '#333333', fontSize: 17 }}>{this.state.productInfo.itemName}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 18, alignItems: 'flex-end' }}>
                            <Text style={{ color: '#ff4315', fontSize: 23, marginLeft: -4 }}>￥{(this.state.productInfo.memberPrice/100).toFixed(2)||'00.00'}</Text>
                            <Text style={{ color: '#999999', fontSize: 13, marginLeft: 10, marginBottom: 4 }}>市场价：￥{(this.state.productInfo.marketPrice/100).toFixed(2)||'00.00'}</Text>
                            <View style={{ width: 26, height: 13, borderRadius: 2, backgroundColor: '#ff4315', marginLeft: 10, marginBottom: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 10 }}>包邮</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#999999' }}>数量：</Text>
                            <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={this._reduce}>
                                    <View style={{ width: 30, height: 30, backgroundColor: '#f9fafa', borderBottomLeftRadius: 2, borderTopLeftRadius: 2, borderColor: '#b5b5b5', justifyContent: 'center', borderWidth: Util.pixel, alignItems: 'center' }}>
                                        <Text style={{ color: '#888888', fontSize: 20 }}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                <TextInput keyboardType={'numeric'} maxLength={100} value={this.state.buyCount} style={{ width: 40, height: 30, textAlign: 'center', borderLeftWidth: 0, borderRightWidth: 0, borderColor: '#b5b5b5', borderWidth: Util.pixel }}/>
                                <TouchableOpacity onPress={this._add}>
                                    <View style={{ width: 30, height: 30, backgroundColor: '#f9fafa', borderBottomRightRadius: 2, borderTopRightRadius: 2, borderColor: '#b5b5b5', justifyContent: 'center', borderWidth: Util.pixel, alignItems: 'center' }}>
                                        <Text style={{ color: '#888888', fontSize: 20 }}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.line]}></View>
                    <View style={styles.bigLine}></View>
                    <View style={{ height: 39, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ curTab: 'productDetail' }) }>
                            <View style={{ justifyContent: 'center', width: 100, alignItems: 'center' }}>
                                <Text style={[{ color: '#666666', fontSize: 15 }, this.state.curTab === 'productDetail' ? styles.activeText : {}]}>图文详情</Text>
                                <View style={this.state.curTab === 'productDetail' ? styles.activeTab : {}}></View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ curTab: 'comment' }) }>
                            <View style={{ justifyContent: 'center', width: 100, alignItems: 'center' }}>
                                <Text style={[{ color: '#666666', fontSize: 15 }, this.state.curTab === 'comment' ? styles.activeText : {}]}>评价详情</Text>
                                <View style={this.state.curTab === 'comment' ? styles.activeTab : {}}></View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.line}></View>
                    {this.state.curTab == 'productDetail' ?
                        <View>
                            <Image style={{ width: Util.size.width, height: 300 }} resizeMode={'contain'} source={{ uri: 'http://tmallapi.bluemoon.com.cn//upload/images/mall_product/test/80000267/xqtjjsqbc01.jpg' }}/>
                        </View>
                        :
                        <Comment itemId={this.props.itemId}></Comment>
                    }
                </ScrollView>
                <View style={styles.line}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 60, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this._tellPhone}>
                            <Image style={{ marginBottom: 4 }} source={require("image!kefu") }/>
                        </TouchableOpacity>
                        <Text style={{ color: '#999', fontSize: 13 }}>客服</Text>
                    </View>
                    <TouchableOpacity  style={{ backgroundColor: '#fc5500', flex: 1, margin: 8, borderRadius: 5, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image  source={require('image!cart') } style={{ marginRight: 5 }}/>
                            <Text style={{ color: '#fff', fontSize: 16 }}>加入购物车</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    },
    _getData: function() {
        var that=this;
        Util.post(ServerUrl.mall_detail_getInfo, { itemId: this.props.itemId }, function(data) {
            if (data && data.isSuccess) {
                that.setState({
                    productInfo:data.itemInfoList[0]
                })
            }
        }, function() {

        })
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
    _tellPhone:function(){
        LinkingIOS.canOpenURL('tel//1864694721',function(isOK){
            if(isOK){
                LinkingIOS.call('tel//1864694721')
            }
        })
    }

});
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef'
    },
    flex: {
        flex: 1
    },
    wrapper: {

    },
    slide: {
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: 240,
        height: 240
    },
    line: {
        backgroundColor: '#ebebeb',
        height: Util.pixel
    },
    bigLine: {
        height: 10,
        backgroundColor: '#efefef',
    },
    margin10: {
        marginLeft: 10,
        marginRight: 10
    },
    productInfoContainer: {
        margin: 10,
        marginBottom: 21
    },
    title: {
        color: '#333333',
        fontSize: 17,

    },
    activeTab: {
        height: 2,
        width: 100,
        backgroundColor: '#005df1',
        position: 'absolute',
        bottom: 0
    },
    activeText: {
        color: '#005df1',
    }
})