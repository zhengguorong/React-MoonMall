/**
 * Created by monkey1990 on 16/3/23.
 */

var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    TouchableOpacity,
    TouchableWithoutFeedback
} = React;
var Util = require('../common/util');
var ServerUrl = require('../common/server');
var CategoryMenu = require('./Category');
var Detail = require('./Detail');



module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: ds.cloneWithRows([]),
            show: false,
            showCategory: false,
        };
    },
    //父状态更新的时候执行
    componentWillReceiveProps:function(){
       this.setState({
           showCategory:false
       })
    },
    componentWillUnmount:function(){
      console.log("componentWillUnmount")  
    },
    render: function() {
        return (
            <View style={styles.flex}>
                <CategoryMenu isVisible={this.state.showCategory}  navigator={this.props.navigator}></CategoryMenu>
                <View style={styles.titleView}>
                    <View style={styles.navBtn}></View>
                    <Text style={styles.titleText}>月亮商城</Text>
                    <TouchableOpacity onPress={this._toggleCategory}>
                        <View style={styles.navBtn}>
                            <View style={styles.categoryBtn}>
                                <Image source={require("image!icon_category") }/>
                                <Text style={styles.navRightText}>分类</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginTop: 0 }} contentOffset={ { y: 20 }} contentInset={{ top: -20 }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        />
                </ScrollView>
            </View>
        );
    },
    componentDidMount: function() {
        this._getData();
    },
    _renderRow: function(row) {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this._toDetail.bind(this, row.id) }>
                    <Image
                        style={{ resizeMode: 'contain', height: Util.size.width / row.rePicUrlInfo.width * row.rePicUrlInfo.height }}
                        source={{ uri: row.rePicUrlInfo.picUrl }}>
                        <TouchableOpacity style={styles.addCartBtn} onPress={this._addCart}><Text style={styles.addCartBtnText}>加入购物车</Text>
                        </TouchableOpacity>
                    </Image>
                </TouchableWithoutFeedback>
            </View>
        )
    },
    _getData: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var that = this;
        Util.post(ServerUrl.mall_home_getRecommendItem, { "recommendType": "all" }, function(data) {
            if (data && data.isSuccess) {
                that.setState({
                    dataSource: ds.cloneWithRows(data.itemRecommentList),
                    show: true
                })
            }
        }, function(err) {
            console.log(err)
        })
    },
    //加入购物车
    _addCart: function() {
        alert("添加购物车成功")
    },
    //跳转到商品详情
    _toDetail: function(id) {
        this.props.navigator.push({
            component: Detail,
            passProps: {
                itemId:id,
                backName: '',
                title: '商品详情',
            }
        });
    },
    //显示或者隐藏分类列表
    _toggleCategory: function() {
        this.setState({
            showCategory: !this.state.showCategory
        })
    }

})
var styles = StyleSheet.create({
    titleView: {
        backgroundColor: '#0058f1',
        paddingTop: 30,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    navBtn: {
        width: 40,
        marginTop: -5,
        alignItems: 'center'
    },
    categoryBtn: {
        width: 30,
        alignItems: 'center'
    },
    navRightText: {
        fontSize: 9,
        color: '#fff',
    },
    flex: {
        flex: 1,
    },
    addCartBtn: {
        position: 'absolute',
        right: 2,
        bottom: 7,
        backgroundColor: '#f13d40',
        padding: 3,
        borderRadius: 2
    },
    addCartBtnText: {
        fontSize: 11,
        color: '#fff'
    }
});