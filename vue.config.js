module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8084,
        proxy: {
            '/market': {
                target: 'http://localhost:9092'
            },
            '/auth': {
                target: 'http://localhost:9092'
            }
        }
    },
}