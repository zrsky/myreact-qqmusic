import originJsonp from 'jsonp';

export default function Jsonp(url, data, options) {
    url += (url.indexOf('?') == -1 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
        originJsonp(url, options, (err, data)=>{
            if(data) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

export function param(data) {
    let url = '';
    for(var i in  data) {
        let value = data[i] ? data[i] : '';
        url += '&' + i + '=' + encodeURIComponent(value);
    }
    return url.substring(1);
}