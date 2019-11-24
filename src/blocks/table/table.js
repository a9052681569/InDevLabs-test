const Vue = require('vue/dist/vue.js');

export default new Vue({
    el: '.table',
    data: {
        pairs: [],
    },
    methods: {
        // метод создает исходный массив пар
        initialPairs() {
            // запрос на сервер
            fetch('https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD,XXBTZEUR,XXBTZCAD,XXBTZGBP,XXBTZJPY')
            .then((res) => {
                // если ответ в порядке - переводим его в json формат
                if(res.ok) {
                    return res.json();
                }
                // если что-то пошло не так- сбрасываем в ошибку
                return Promise.reject();
            })
            .then((res) => {
                // далее объект res.result - это запрошенные пары, но в нем много лишних данных
                // вынимаем из него нужные данные и вставляем в наш массив удобными объектами
                Object.keys(res.result).forEach((item) => {
                    this.pairs.push({
                        name: item,
                        ask: res.result[item].a[0],
                        bid: res.result[item].b[0]
                    })
                })
            })
            .catch(err => console.log(err))
        },
        // метод обновляет данные о парах
        updatePairs() {
            // запрос на сервер
            fetch('https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD,XXBTZEUR,XXBTZCAD,XXBTZGBP,XXBTZJPY')
            .then((res) => {
                // если ответ в порядке - переводим его в json формат
                if(res.ok) {
                    return res.json();
                }
                // если что-то пошло не так- сбрасываем в ошибку
                return Promise.reject();
            })
            .then((res) => {
                // вставляем обновленные значения объектов пар
                this.pairs.forEach((item, index) => {
                    item.name = Object.keys(res.result)[index];
                    item.ask = res.result[item.name].a[0];
                    item.bid = res.result[item.name].b[0];
                })
            })
            .catch(err => console.log(err))
                
        },
        // метод с заданной регулярностью обновляет значения пар
        refreshPairs() {
            setTimeout(() => {
                this.updatePairs();
                this.refreshPairs();
            }, 15000)
        }
    },
    // применяем методы на созданном vue объекте
    created() {
        this.$nextTick(function() {
            this.initialPairs();
            this.refreshPairs();
        })
        
    }
})