module.exports = {
    devServer: {
        contentBase: '.',
        port: 5000,
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                // ws: false,
                pathRewrite: {'^/api': '/api'}
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
