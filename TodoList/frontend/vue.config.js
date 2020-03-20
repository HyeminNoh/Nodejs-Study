const path = require("path");
module.exports = { 
    outputDir : path.resolve(__dirname, "../backend/public/"),
    devServer: { 
        proxy: { 
            // proxyTable 설정 
            '/': { 
                target: 'http://localhost:3000/', 
                changeOrigin: true , 
                pathRewrite:{ 
                    "^/" : '' 
                } 
            } 
        } 
    } 
};
