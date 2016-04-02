var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    TextInput
} = React;
var Util = require('../common/util');
var ServerUrl = require('../common/server');
var moment = require('moment');

module.exports = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: ds.cloneWithRows([]),
            show:false,
        };
    },
    componentDidMount:function(){
      this._getData();  
    },
    render: function() {
        return (
            <View>
            {
                this.state.show?            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                />:Util.loading
            }
            </View>

        )
    },
    _renderRow: function(row) {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.icon}>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.nickName}>{row.nickName}</Text>
                        <Text style={styles.createTime}>{this._displayDate(row.createTime)}</Text>
                        <Text style={styles.content}>{row.content}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
            </View>
        )
    },
    _getData: function() {
        var that=this;
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        Util.post(ServerUrl.mall_detail_getComment, { "pageSize": 10, "currentPage": 1, "itemId": "i16022120214325721111" }, function(data) {
            if (data && data.isSuccess) {
                 that.setState({
                     dataSource:ds.cloneWithRows(data.itemCommentList),
                     show:true
                 })
            }
        },function(err){
            
        })
    },
    _displayDate:function(date){
        return moment(date).format('YYYY-MM-DD mm:hh:ss')
    }
})
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingLeft: 15
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#999',
        borderWidth: Util.pixel
    },
    nickName: {
        fontSize: 12,
        color: '#333',
        marginBottom: 4,
    },
    createTime: {
        fontSize: 8,
        color: '#999',
        marginBottom: 11
    },
    content: {
        fontSize: 14,
        color: '#333'
    },
    info: {
        marginLeft: 11,
        marginBottom: 19,
    },
    line: {
        height: Util.pixel,
        backgroundColor: '#ebebeb',
        marginLeft: 55,
        marginRight: 15
    }
})