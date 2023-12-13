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