const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('proxy-success', () => {
    alert('重启代理成功');
});

const testBtn = document.querySelector("#test_btn");
const saveBtn = document.querySelector("#save_btn");
const proxyBtn = document.querySelector("#proxy_btn");

const ipInput = document.querySelector("#ip_input");
const portInput = document.querySelector("#port_input");

testBtn.onclick = testVideo;
saveBtn.onclick = saveConfig;
proxyBtn.onclick = restartProxy;

function testVideo() {
    const ipAddress = ipInput.value;
    const port = portInput.value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://${ipAddress}:${port}/health`);
    xhr.send();

    xhr.onreadystatechange = function () {　　　　
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {　　　　　　
                alert('视频服务器测试通过');
            } else {
                alert('请检查视频服务器连接');　　　　
            }
        }
    };
}

function saveConfig() {
    localStorage.setItem('ipAddress', ipInput.value);
    localStorage.setItem('port', portInput.value);
}

function restartProxy() {
    const ipAddress = ipInput.value;
    const port = portInput.value;

    if (!ipAddress || !port) {
        return alert('请输入配置');
    }

    ipcRenderer.send('proxy', {
        ipAddress,
        port
    });
}

(function initConfig() {
    const ipAddress = localStorage.getItem('ipAddress');
    const port = localStorage.getItem('port');

    ipInput.value = ipAddress;
    portInput.value = port;
})();

restartProxy();
