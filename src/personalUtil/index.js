// 节流函数
function Throttle(fun, time) {
    let bool = true;
    return () => {
        if (!bool) return;
        setTimeout(() => { bool = true; }, time);
        bool = false;
        console.log(fun);
        let string = 'abc';
        fun();
    }
}

// 防抖函数
function Debounce(fun, time) {
    let timeID = null;
    return () => {
        clearTimeout(timeID);
        timeID = setTimeout(fun, time);
    }
}

// 复制
function useCopyContent(bool = ture) {
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
            console.log('复制失败--采取第二种复制方案', err);
        }
    }

    return bool ? asyncCopyContent : copyContent;
}
