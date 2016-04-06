/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio,
  ActivityIndicatorIOS
  } = React;

module.exports = {
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),
  

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  getDisplayPrice:function(price){
      if(price){
         return (price/100).toFixed(2);
      }else{
          return "00.00"
      }
  },
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback){
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        failCallback(err);
      });
  },
  post:function(url,data, successCallback, failCallback){
    fetch(url,{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(data)})
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        failCallback(err);
      });
  },
  //获取url参数
  getParam:function(url,method){
    if(url&&method){
      var params=url.split('&');
      for(var i=0;i<params.length;i++){
          var tempParams=params[i].split(':');
          if(tempParams[0]===method){
            return this.base64_decode(tempParams[1]||"");
          }
      }
    }else{
      return "";
    }
  },
  base64_decode:function(str){
                  var c1, c2, c3, c4;
                  var base64DecodeChars = new Array(
                          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                          -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
                          58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
                          7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                          25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
                          -1, -1
                  );
                  var i=0, len = str.length, string = '';

                  while (i < len){
                          do{
                                  c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                          } while (
                                  i < len && c1 == -1
                          );

                          if (c1 == -1) break;

                          do{
                                  c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                          } while (
                                  i < len && c2 == -1
                          );

                          if (c2 == -1) break;

                          string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                          do{
                                  c3 = str.charCodeAt(i++) & 0xff;
                                  if (c3 == 61)
                                          return string;

                                  c3 = base64DecodeChars[c3]
                          } while (
                                  i < len && c3 == -1
                          );

                          if (c3 == -1) break;

                          string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                          do{
                                  c4 = str.charCodeAt(i++) & 0xff;
                                  if (c4 == 61) return string;
                                  c4 = base64DecodeChars[c4]
                          } while (
                                  i < len && c4 == -1
                          );

                          if (c4 == -1) break;

                          string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
                  }
                  return string;
          },
  /*loading效果*/
  loading: <ActivityIndicatorIOS color="#000" style={{marginTop:40}}/>
};
