// performance related
function printSystemInfo() {
    // print system info
    let ua = navigator.userAgent,
        logMsg = '';

    // device & system
    let ipod = ua.match(/(ipod).*\s([\d_]+)/i),
        ipad = ua.match(/(ipad).*\s([\d_]+)/i),
        iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
        android = ua.match(/(android)\s([\d\.]+)/i);

    logMsg = 'Unknown';
    if (android) {
        logMsg = 'Android ' + android[2];
    } else if (iphone) {
        logMsg = 'iPhone, iOS ' + iphone[2].replace(/_/g, '.');
    } else if (ipad) {
        logMsg = 'iPad, iOS ' + ipad[2].replace(/_/g, '.');
    } else if (ipod) {
        logMsg = 'iPod, iOS ' + ipod[2].replace(/_/g, '.');
    }
    let templogMsg = logMsg;
    // wechat client version
    let version = ua.match(/MicroMessenger\/([\d\.]+)/i);
    logMsg = 'Unknown';
    if (version && version[1]) {
        logMsg = version[1];
        templogMsg += (', WeChat ' + logMsg);
        console.info('[system]', 'System:', templogMsg);
    } else {
        console.info('[system]', 'System:', templogMsg);
    }

    // HTTP protocol
    logMsg = 'Unknown';
    if (location.protocol == 'https:') {
        logMsg = 'HTTPS';
    } else if (location.protocol == 'http:') {
        logMsg = 'HTTP';
    } else {
        logMsg = location.protocol.replace(':', '');
    }
    templogMsg = logMsg;
    // network type
    let network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g);
    logMsg = 'Unknown';
    if (network && network[0]) {
        network = network[0].split('/');
        logMsg = network[1];
        templogMsg += (', ' + logMsg);
        console.info('[system]', 'Network:', templogMsg);
    } else {
        console.info('[system]', 'Protocol:', templogMsg);
    }
    // User Agent
    console.info('[system]', 'UA:', ua);
}
window.onload = function () {
    let performance = window.performance || window.msPerformance || window.webkitPerformance;

    // printSystemInfo()
    // timing
    if (performance && performance.timing) {
        let t = performance.timing;
        // if (t.navigationStart) {
        //     console.info('[system]', 'navigationStart:', t.navigationStart);
        // }
        // if (t.navigationStart && t.domainLookupStart) {
        //     console.info('[system]', 'navigation:', (t.domainLookupStart - t.navigationStart) + 'ms');
        // }
        if (performance.navigation) {
            console.info('[重定向次数]', 'response:', (performance.navigation.redirectCount) + '');
        }

        if (t.redirectEnd && t.redirectStart) {
            console.info('[重定向耗时]', 'response:', (t.redirectEnd - t.redirectStart) + 'ms');
        }

        if (t.domainLookupEnd && t.domainLookupStart) {
            console.info('[DNS 解析耗时]', 'dns:', (t.domainLookupEnd - t.domainLookupStart) + 'ms');
        }

        if (t.connectEnd && t.connectStart) {
            if (t.connectEnd && t.secureConnectionStart) {
                console.info('[SSL 安全连接耗时]', 'tcp (ssl):', (t.connectEnd - t.connectStart) + 'ms (' + (t.connectEnd - t.secureConnectionStart) + 'ms)');
            } else {
                console.info('[TCP 连接耗时]', 'tcp:', (t.connectEnd - t.connectStart) + 'ms');
            }
        }

        if (t.responseStart && t.requestStart) {
            console.info('[网络请求耗时]', 'ttfb:', (t.responseStart - t.requestStart) + 'ms');
        }

        if (t.responseEnd && t.responseStart) {
            console.info('[数据传输耗时]', 'response:', (t.responseEnd - t.responseStart) + 'ms');
        }

        if (t.loadEventStart && t.domContentLoadedEventEnd) {
            console.info('[资源加载耗时]', 'response:', (t.loadEventStart - t.domContentLoadedEventEnd) + 'ms');
        }

        if (t.domInteractive && t.responseEnd) {
            console.info('[DOM解析耗时]', 'response:', (t.domInteractive - t.responseEnd) + 'ms');
        }

        if (t.responseStart && t.domainLookupStart) {
            console.info('[首字节时间]', 'response:', (t.responseStart - t.domainLookupStart) + 'ms');
        }

        if (t.responseEnd && t.fetchStart) {
            console.info('[白屏时间]', 'response:', (t.responseEnd - t.fetchStart) + 'ms');
        }

        if (t.domInteractive && t.fetchStart) {
            console.info('[首次可交互时间]', 'response:', (t.domInteractive - t.fetchStart) + 'ms');
        }

        if (t.domContentLoadEventEnd && t.fetchStart) {
            console.info('[DOM Ready 时间]', 'response:', (t.domContentLoadEventEnd - t.fetchStart) + 'ms');
        }

        if (t.loadEventStart && t.fetchStart) {
            console.info('[页面完全加载时间]', 'response:', (t.loadEventStart - t.fetchStart) + 'ms');
        }
    }
}
