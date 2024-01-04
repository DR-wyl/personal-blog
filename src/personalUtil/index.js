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

// 创建MutationObserver
export function createMutationObserver(targetNode, callback = (mutationsList, observer) => { observer.disconnect(); }, config) {
    /* 
        observe 方法中 config 参数有已下几个选项：
        childList：设置 true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
        attributes：设置 true，表示观察目标属性的改变
        characterData：设置 true，表示观察目标数据的改变
        subtree：设置为 true，目标以及目标的后代改变都会观察
        attributeOldValue：如果属性为 true 或者省略，则相当于设置为 true，表示需要记录改变前的目标属性值，
            设置了 attributeOldValue 可以省略 attributes 设置
        characterDataOldValue：如果 characterData 为 true 或省略，则相当于设置为 true,表示需要记录改变之前的目标数据，
            设置了 characterDataOldValue 可以省略 characterData 设置
        attributeFilter：如果不是所有的属性改变都需要被观察，并且 attributes 设置为 true 或者被忽略，
            那么设置一个需要观察的属性本地名称（不需要命名空间）的列表
    */
    const observer = new MutationObserver(callback);
    config = config || { childList: true, subtree: true, attributes: true };
    observer.observe(targetNode, config);
    return observer;
}