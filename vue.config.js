module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/market': {
                target: 'http://192.168.1.246:9092'
            },
            '/auth': {
                target: 'http://192.168.1.246:9092'
            }
        }
    },
}