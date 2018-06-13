const fs = require('fs');
const httpProxy = require('http-proxy');
const ipcMain = require('electron').ipcMain;

ipcMain.on('proxy', function(event, { ipAddress, port }) {
    // 代理 lodop
    httpProxy.createServer({
        ssl: {
            key: fs.readFileSync('./cert/titan.key', 'utf8'),
            cert: fs.readFileSync('./cert/titan.crt', 'utf8')
        },
        target: 'http://localhost:8000',
        secure: false
    }).listen(443);

    // 代理 WebSocket
    httpProxy.createServer({
        target: 'ws://localhost:8000/c_webskt/',
        ws: true
    }).listen(80);

    // 代理 视频服务
    httpProxy.createServer({
        ssl: {
            key: fs.readFileSync('./cert/titan.key', 'utf8'),
            cert: fs.readFileSync('./cert/titan.crt', 'utf8')
        },
        target: `http://${ipAddress}:${port}`,
        secure: false
    }).listen(8443);

    event.sender.send('proxy-success');
});

