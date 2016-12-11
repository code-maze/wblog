/* 
* @Author: anchen
* @Date:   2016-12-10 08:31:35
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-10 20:33:21
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

if (!Number.prototype.toDateTime) {
     let replaces = {
        'yyyy':function (dt) {
            return dt.getFullYear();
        },
        'yy':function (dt) {
            return dt.getFullYear() % 100;
        },
        'MM':function(dt){
            let m = dt.getMonth() + 1;
            return (m < 10 ? '0' : '') + m;
        },
        'M':function(dt){
            return dt.getMonth() + 1;
        },
        'dd':function (dt) {
            let d = dt.getDate();
            return (d < 10 ? '0' : '') + d;
        },
        'd':function (dt) {
            return dt.getDate();
        },
        'hh':function (dt) {
            let h = dt.getHours();
            return (h < 10 ? '0' : '') + h;
        },
        'h':function (dt) {
            return dt.getHours();
        },
        'mm':function (dt) {
            let m = dt.getMinutes();
            return (m < 10 ? '0' : '') + m;
        },
        'm':function (dt) {
            return dt.getMinutes();
        },
        'ss':function (dt) {
            let s = dt.getSeconds();
            return (s < 10 ? '0' : '') + s;
        },
        's':function(dt){
            return dt.getSeconds();
        }
     };
     let token = /([a-zA-Z]+)/;
     Number.prototype.toDateTime = function(format){
        let fmt = format || 'yyyy-MM-dd hh:mm:ss';
        let dt = new Date(this);
        let arr = fmt.split(token);
        for(let i = 0; i < arr.length; i++){
            let s = arr[i];
            if (s && s in replaces) {
                arr[i] = replaces[s](dt);
            }
        }
        return arr.join('');
    }
}