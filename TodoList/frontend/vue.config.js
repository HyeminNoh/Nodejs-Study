const path = require("path");
module.exports = { 
    outputDir : path.resolve(__dirname, "../backend/public/"),
    devServer: {
        proxy: {
            '/': {
                "target": 'http://localhost:8080/',
                "pathRewrite": { '^/': '' },
                "changeOrigin": true,
                "secure": false
            }
        }
    }, 
};
