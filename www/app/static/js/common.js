/* 
* @Author: anchen
* @Date:   2016-12-10 08:31:35
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-10 12:00:24
*/

'use strict';
// 返回一个查询字符串对象
function queryStringObj() {
    let obj = Object.create(null),
        arr = location.search.split(/[\?|&]/g);
    for (let i = arr.length; --i; ) {
        let [key, value] = arr[i].split('=');
        obj[key] = value;
    }
    return obj;
}
if(!Number.prototype.toDateTime){
     var replaces = {
        'yyyy':function (dt) {
            return dt.getFullYear().toString();
        },
        'yy':function (dt) {
            return (dt.getFullYear()%100).toString();
        },
        'MM':function(dt){
            var m=dt.getMonth()+1;
            return m<10?('0'+m).toString():m.toString();
        },
        'M':function(dt){
            return dt.getMonth()+1;
        },
        'dd':function (dt) {
            var d=dt.getDate();
            return d<10?('0'+d).toString():d.toString();
        },
        'd':function (dt) {
            return dt.getDate();
        },
        'hh':function (dt) {
            var h=dt.getHours();
            return h<10?('0'+h).toString():h.toString();
        },
        'h':function (dt) {
            return dt.getHours();
        },
        'mm':function (dt) {
            var m=dt.getMinutes();
            return m<10?('0'+m).toString():m.toString();
        },
        'm':function (dt) {
            return dt.getMinutes();
        },
        'ss':function (dt) {
            var s=dt.getSeconds();
            return s<10?('0'+s).toString():s.toString();
        },
        's':function(dt){
            return dt.getSeconds();
        }
     };
     var token=/([a-zA-Z]+)/;
     Number.prototype.toDateTime=function(format){
        var fmt=format||'yyyy-MM-dd hh:mm:ss';
        var dt=new Date(this);
        var arr=fmt.split(token);
        for(var i=0;i<arr.length;i++){
            var s=arr[i];
            if(s && s in replaces){
                arr[i]=replaces[s](dt);
            }
        }
        return arr.join('');
    }
}