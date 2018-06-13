const fs = require('fs');
const httpProxy = require('http-proxy');
const ipcMain = require('electron').ipcMain;

let lodopProxy;
let websocketProxy;
let videoProxy;

ipcMain.on('proxy', function(event, { printerAddress, videoAddress }) {
    lodopProxy && lodopProxy.close();
    // 代理 lodop
    lodopProxy = httpProxy.createServer({
        ssl: {
            key: fs.readFileSync('./cert/titan.key', 'utf8'),
            cert: fs.readFileSync('./cert/titan.crt', 'utf8')
        },
        target: `http://${printerAddress}`,
        secure: false
    }).listen(443);

    websocketProxy && websocketProxy.close();
    // 代理 WebSocket
    websocketProxy = httpProxy.createServer({
        target: `ws://${printerAddress}/c_webskt/`,
        ws: true
    }).listen(80);

    videoProxy && videoProxy.close();
    // 代理 视频服务
    videoProxy = httpProxy.createServer({
        ssl: {
            key: fs.readFileSync('./cert/titan.key', 'utf8'),
            cert: fs.readFileSync('./cert/titan.crt', 'utf8')
        },
        target: `http://${videoAddress}`,
        secure: false
    }).listen(8443);

    event.sender.send('proxy-success');
});

