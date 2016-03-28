/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';

var Firebase=require('firebase');

class FirebaseDemo extends Component {
    //es6构造函数初始化
    constructor(props){
        super(props);
        //创建数据库实例
        var myFirebaseRef = new Firebase('https://blinding-inferno-607.firebaseio.com/');
        //创建子节点
        this.itemsRef = myFirebaseRef.child('items');
        
        this.state = {
            newTodo:'',
            // todoSource: new ListView.DataSource({rowHasChanged:function(row1,row2){return row1!=row2}})
            //es6写法
            todoSource: new ListView.DataSource({rowHasChanged:(row1,row2)=>row1!=row2})
        };
        this.items = [];
    }
    componentDidMount(){
        //监听firebase节点增加
        this.itemsRef.on('child_added',(dataSnapshot) => {
            this.items.push({id: dataSnapshot.key(), text:dataSnapshot.val()})
            this.setState({
                todoSource: this.state.todoSource.cloneWithRows(this.items)
            })
        })
        //监听firebase节点删除
        this.itemsRef.on('child_removed',(dataSnapshot) => {
            //过滤删除的id
            this.items =this.items.filter((x) => x.id !== dataSnapshot.key())
            //设置todoSource值
            this.setState({
                todoSource: this.state.todoSource.cloneWithRows(this.items)
            })
        })
    }
    
    //添加todo数据
    addTodo(){
        if(this.state.newTodo!==''){
            this.itemsRef.push({
                todo:this.state.newTodo
            });
            this.setState({
                newTodo:''
            })
        }
    }
    
    //删除todo数据
    removeTodo(rowData){
        this.itemsRef.child(rowData.id).remove();
    }
    

  render() {
    return (
        <View style={styles.appContainer}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    My Todos
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=>this.addTodo()}
                    underlayColor='#dddddd'>
                    <Text style={styles.btnText}>Add!</Text>
                </TouchableHighlight>
            </View>
            <ListView
                dataSource={this.state.todoSource}
                renderRow={this.renderRow.bind(this)} />
        </View>
        
    );
  }
  //定义listView里面行的显示方式
  renderRow(rowData){
      return(
          <TouchableHighlight 
            underlayColor='#dddddd'
            onPress={() => this.removeTodo(rowData)}>
            <View>
            <View style={styles.row}>
                <Text style={styles.todoText}>{rowData.text.todo}</Text>
            </View>
            <View style={styles.seperator} />
            </View>
          </TouchableHighlight>
      )
  }
  
}

const styles = StyleSheet.create({
    appContainer:{
        flex:1
    },
    titleView:{
        backgroundColor: '#48afdb',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'column'
    },
    titleText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20
    },
    inputContainer:{
        marginTop:5,
        padding:10,
        flexDirection:'row'
    },
    button:{
        height:36,
        flex:2,
        flexDirection:'row',
        backgroundColor:'#48afdb',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    btnText:{
        color:'#FFF'
    },
    input:{
        height:36,
        padding:4,
        marginRight:5,
        flex:4,
        fontSize:18,
        borderWidth:1,
        borderColor:'#48afdb',
        borderRadius:4,
        color:'#48bbec'
    },
    row:{
        flexDirection:'row',
        padding:12,
        height:44
    },
    seperator:{
        height:1,
        backgroundColor:'#CCCCCC'
    },
    todoText:{
        flex:1,
    }
    
});

module.exports = FirebaseDemo;