import md5 from 'js-md5'

let Base64 = require('js-base64').Base64;


export const getSign = ( data ) => {
    // // data['sign'] = '11622534f06182b90ab6a93cb10816fe';
        //获取key
        var keys = Object.keys(data);
        //排序key
        keys.sort();
        //循环拼接
        var params = [];

        keys.forEach(e =>{
            if (data[e] !== null && data[e] !== undefined){
                //url转义并且拼接
                var str = encodeURIComponent(data[e],true);
            }
            params.push(e + '=' + str);
        });
        //加入&
        let paramStr = params.join('&')
        //加入key
        paramStr += '210872595b52ab7be0f4732d9d5eda8d';
        //md5加密
        var res = md5.hex(Base64.encode(paramStr));
        return res;
}