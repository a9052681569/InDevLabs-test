import Vue from 'vue/dist/vue.js'

import '../css/style.css'

new Vue({
    el: '.main',
    data: {
        main__title: 'привет',
        pairs: [
            {
                name: 'pidor',
                bid: 20.3,
                ask: 14.2
            },
            {
                name: 'pidor',
                bid: 20.3,
                ask: 14.2
            },
            {
                name: 'pidor',
                bid: 20.3,
                ask: 14.2
            },
            {
                name: 'sladost',
                bid: 20.3,
                ask: 14.2
            },
            {
                name: 'pidor',
                bid: 20.3,
                ask: 14.2
            }
        ]
    }
})
let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    "User-Agent"   : "MY-UA-STRING"
});


fetch('https://api.kraken.com/0/public/AssetPairs', {
    method: 'GET',
    headers: headers
})
.then((res) => {
    if(res.ok) {
        console.log(res)
        return res.json();
    }
    return Promise.reject();
})
.then((res) => {
    console.log(res)
})
.catch(err => console.log(err))
