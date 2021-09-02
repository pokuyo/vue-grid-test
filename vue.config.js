module.exports = {
    devServer: {
        proxy: {
            '/V1': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/V1': ''
                }
            },
            '/V2': {
                target: 'https://loclhost:4437',
                changeOrigin: true,
                pathRewrite: {
                    '^/V2': ''
                }
            },
    
        }
    }
}