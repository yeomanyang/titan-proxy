const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('proxy-success', () => {
    alert('重启代理成功');
});
const testPrinterBtn = document.querySelector("#test_printer_btn");
const testVideoBtn = document.querySelector("#test_video_btn");
const saveBtn = document.querySelector("#save_btn");
const proxyBtn = document.querySelector("#proxy_btn");
const videoInput = document.querySelector("#video_input");
const printerInput = document.querySelector("#printer_input");

testPrinterBtn.onclick = testPrinter;
testVideoBtn.onclick = testVideo;
saveBtn.onclick = saveConfig;
proxyBtn.onclick = restartProxy;

function testPrinter() {
    const ipAddress = printerInput.value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://${ipAddress}/CLodopfuncs.js`);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert('打印服务器测试通过');
            } else {
                alert('请检查打印服务器连接');
            }
        }
    };
}

function testVideo() {
    const ipAddress = videoInput.value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://${ipAddress}/health`);
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
    localStorage.setItem('printerAddress', printerInput.value);
    localStorage.setItem('videoAddress', videoInput.value);
    alert('保存成功');
}

function restartProxy() {
    const printerAddress = printerInput.value;
    const videoAddress = videoInput.value;

    if (!printerAddress || !videoAddress) {
        return alert('请输入配置');
    }

    ipcRenderer.send('proxy', {
        printerAddress,
        videoAddress
    });
}

(function initConfig() {
    const printerAddress = localStorage.getItem('printerAddress');
    const videoAddress = localStorage.getItem('videoAddress');

    printerInput.value = printerAddress;
    videoInput.value = videoAddress;
})();

restartProxy();

