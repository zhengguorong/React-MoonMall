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

module.exports=React.createClass({
    getInitialState: function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            show:false
        };
    },
    render: function(){
        return ( 
            <View style={styles.flex}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>月亮商城</Text>
                <View style={styles.navRightBtn}>
                    <Image source={require("image!icon_category")}/> 
                    <Text style={styles.navRightText}>分类</Text>
                </View>
            </View>
            <ScrollView style={{marginTop:0}} contentOffset={ { y:20 }} contentInset={{top:-20}}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow} 
                />
            </ScrollView>
            </View>
        );
    },
    componentDidMount: function(){
        this._getData();
    },
    _renderRow: function(row){
      return (
          <View>
          <TouchableWithoutFeedback onPress={this._toDetail.bind(this,row.id)}>
            <Image 
                style={{resizeMode:'contain',height:Util.size.width/row.rePicUrlInfo.width*row.rePicUrlInfo.height}}
                source={{uri:row.rePicUrlInfo.picUrl}}>
                <TouchableOpacity style={styles.addCartBtn} onPress={this._addCart}><Text style={styles.addCartBtnText}>加入购物车</Text>
                </TouchableOpacity>
                </Image>
          </TouchableWithoutFeedback>
          </View>
      )  
    },
    _getData: function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var that=this;
        Util.post(ServerUrl.mall_home_getRecommendItem,{"recommendType":"all"},function(data){
            if(data&&data.isSuccess){
                that.setState({
                    dataSource: ds.cloneWithRows(data.itemRecommentList),
                    show:true
                })
            }
        },function(err){
            alert(err)
        })
    },
    _addCart: function(){
        alert("添加购物车成功")
    },
    _toDetail: function(id){
        alert("toDetail")
    }
})
var styles = StyleSheet.create({
        titleView:{
        backgroundColor: '#0058f1',
        paddingTop:30,
        paddingBottom:5,
        flexDirection:'row',
    },
    titleText:{
        color: '#FFFFFF',
        fontWeight:'bold',
        flex:1,
        fontSize:16,
        textAlign: 'center',
    },
    navRightBtn:{
        marginTop:-5,
        marginRight:10,
        alignItems:'center'
    },
    navRightText:{
        fontSize:9,
        color:'#fff'
    },
  flex:{
    flex: 1,
  },
  list_item:{
    lineHeight:25,
    fontSize:16,
    marginLeft:10,
    marginRight:10
  },
  addCartBtn:{
      position:'absolute',
      right:2,
      bottom:7,
      backgroundColor:'#f13d40',
      padding:3,
      borderRadius:2
  },
  addCartBtnText:{
      fontSize:11,
      color:'#fff'
  }
});