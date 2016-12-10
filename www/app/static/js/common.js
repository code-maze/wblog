/* 
* @Author: anchen
* @Date:   2016-12-10 08:31:35
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-10 09:00:23
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