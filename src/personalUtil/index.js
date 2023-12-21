// 节流函数
export function Throttle(fun, time) {
    let bool = true;
    return () => {
        if (!bool) return;
        setTimeout(() => { bool = true; }, time);
        bool = false;
        fun();
    }
}

// 防抖函数
export function Debounce(fun, time) {
    let timeID = null;
    return (...args) => {
        clearTimeout(timeID);
        timeID = setTimeout(fun, time, ...args);
    }
}

// 复制
export function useCopyContent(bool = true) {
    // bool 设为true使用异步，反之使用同步
    // 同步兼容性更好，异步的使用失败了会调起同步的
    function copyContent(content) {
        let inputDom = document.createElement('textarea');
        // 设置为只读，防止移动端手机上弹出软键盘  
        inputDom.setAttribute('readonly', 'readonly');
        inputDom.value = content;
        document.body.appendChild(inputDom);
        inputDom.select();
        // Input要在正常的编辑状态下原生复制方法才会生效
        const result = document.execCommand('copy')
        document.body.removeChild(inputDom);
        return result;
    }
    async function asyncCopyContent(content) {
        const text = content || '';
        try {
            // 由于旧版本无window.navigator.clipboard，采用报错形式捕捉
            await window.navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            return copyContent(text);
        }
    }
    return bool ? asyncCopyContent : copyContent;
}

// ECharts实例
export function EChartInit(echarts, objOption) {
    /* 
        objOption传值示例
        {
            el: '',
            // 容器元素
            option: '',
            // setOption参数
            onMounted: () => { },
            // 挂载后钩子
            onError: () => { },
            // 错误钩子
            resizeObserver: true
            // 使用resizeObserver自适应
        }
    */
    try {
        const myChart = echarts.init(objOption.el);
        myChart.setOption(objOption.option);
        let timeID;
        const DebounceCallback = () => {
            clearTimeout(timeID);
            timeID = setTimeout(myChart.resize, 100);
        }
        if (objOption.resizeObserver) {
            // console.log('使用ResizeObserver');
            const observer = new ResizeObserver(DebounceCallback);
            observer.observe(objOption.el);
        } else {
            // console.log('使用窗口resize');
            window.addEventListener("resize", DebounceCallback);
        }
        if (objOption.onMounted) {
            objOption.onMounted(objOption.el, objOption.option, myChart);
        }
        return myChart;
    } catch (e) {
        if (objOption.onError) {
            objOption.onError(e);
        } else {
            console.error(e);
        }
        return null;
    }
};

// 直接调用可解决 ERROR ResizeObserver loop completed with undelivered notifications.
export function useDebounceEditResizeObserver(time = 16) {
    const wResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends wResizeObserver {
        constructor(callback) {
            super(Debounce(callback, time));
        }
    };
}

// 创建ResizeObserver
export function createResizeObserver(el, callback) {
    const observer = new ResizeObserver(callback);
    observer.observe(el);
    return observer;
}