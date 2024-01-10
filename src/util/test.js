const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    state = PENDING;
    result = void 0;
    _resolveArr = [];
    _rejectedArr = [];
    constructor(executor) {
        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.result = value;
                this._resolveArr.forEach((func) => func());
            }
        };

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.result = reason;
                this._rejectedArr.forEach((func) => func());
            }
        };

        executor(resolve, reject);
    }

    _handleSettledFunc(promise, x, resolve, reject) {
        // 检测循环调用
        if (x === promise) {
            reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
        }

        // then中返回新的promise时使用新promise状态。x为假值时忽略.then的判断
        if (x && (typeof x === "object" || typeof x === "function")) {
            let done = false;
            // 捕获x.then及then.call的报错
            try {
                const then = x.then;
                if (typeof then === "function") {
                    then.call(
                        x,
                        (y) => {
                            if (done) {
                                return;
                            }
                            done = true;
                            this._handleSettledFunc(promise, y, resolve, reject);
                        },
                        (r) => {
                            if (done) {
                                return;
                            }
                            done = true;
                            reject(r);
                        }
                    );
                } else { // 没有报错直接resolve
                    resolve(x);
                }
            } catch (e) {
                if (done) {
                    return;
                }
                done = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }

    /**
     * 返回一个promise对象
     * @param {function} onFulfilled resolve后需要执行的函数
     * @param {function} onRejected reject后需要执行的函数
     * @returns
     */
    then(onFulfilled, onRejected) {
        const promise = new MyPromise((resolve, reject) => {
            onFulfilled =
                typeof onFulfilled === "function" ? onFulfilled : (value) => value;
            onRejected =
                typeof onRejected === "function"
                    ? onRejected
                    : (reason) => {
                        throw reason;
                    };

            const _handleFunc = (handleFunc) => {
                // 只能在这使用setTimeout，否则promise变量不能传递，报未初始化的错
                setTimeout(() => {
                    // 捕获handleFunc(this.result)中的报错
                    try {
                        this._handleSettledFunc(
                            promise,
                            handleFunc(this.result),
                            resolve,
                            reject
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            };
            // 返回的函数会被异步调用
            if (this.state === FULFILLED) {
                _handleFunc(onFulfilled);
            } else if (this.state === REJECTED) {
                _handleFunc(onRejected);
            } else {
                // 数组形式保存onFulfilled、onRejected函数
                this._resolveArr.push(() => _handleFunc(onFulfilled));
                this._rejectedArr.push(() => _handleFunc(onRejected));
            }
        });
        return promise;
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
export default MyPromise;