/* 
    pending -> fulfilled
    pending -> rejected
*/
// 通过变量报错状态，便于后续使用
// 状态只能由pending -> fulfilled或pending -> rejected
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class wePromise {
    state = PENDING;
    result = undefined;
    constructor(callback) {
        const resolve = (result) => {
            if (this.state !== PENDING) return;
            this.state = FULFILLED;
            this.result = result;
        };
        const reject = (result) => {
            if (this.state !== PENDING) return;
            this.state = REJECTED;
            this.result = result;
        };
        callback(resolve, reject);
    }
}