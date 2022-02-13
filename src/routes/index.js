const fs = require('fs');
const path = require("path")
const router = require("express").Router();

const loadDir = (dirname = __dirname, prefix = '') => {
    fs
        .readdirSync(dirname)
        .forEach((file) => {
            if (file === "index.js") return;
            const pathFile = path.join(dirname, file)
            const prefixName = file.split('.').shift();
            const prefixRoute = [prefix, prefixName].filter((item) => item !== '').join('/');
            if (fs.statSync(pathFile).isDirectory()) {
                loadDir(pathFile, path.join(prefix, file));
            } else {
                router.use(`/api/${prefixRoute}`, require(pathFile));
            }
        });
};

loadDir();
module.exports = router;