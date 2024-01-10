const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function runAsynctask(callback) {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(callback);
    } else if (typeof MutationObserver === 'function') {
        const observer = new MutationObserver(callback);
        const divNode = document.createElement('div');
        observer.observe(divNode, { childList: true });
        divNode.innerHTML = '1';
    } else {
        setTimeout(callback, 0);
    }
}

function executePromise(returnPromise, callbackReturnPromise, resolve, reject) {
    if (callbackReturnPromise === returnPromise) {
        throw new TypeError('Chaining cycle detected for promise #<Promise>');
    }
    if (callbackReturnPromise instanceof wePromise) {
        callbackReturnPromise.then(res => resolve(res), error => reject(error));
        // callbackReturnPromise.then(resolve, reject);
    } else {
        resolve(callbackReturnPromise);
    }
}


class wePromise {
    state = PENDING;
    result = undefined;
    #handlers = [];
    constructor(callback) {
        const resolve = (result) => {
            if (this.state !== PENDING) return;
            this.state = FULFILLED;
            this.result = result;
            this.#handlers.forEach(({ onFulfilled }) => {
                onFulfilled(this.result);
            });
        };
        const reject = (result) => {
            if (this.state !== PENDING) return;
            this.state = REJECTED;
            this.result = result;
            this.#handlers.forEach(({ onRejected }) => {
                onRejected(this.result);
            });
        };
        try {
            callback(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
        const p1 = new wePromise((resolve, reject) => {
            switch (this.state) {
                case FULFILLED:
                    runAsynctask(() => {
                        try {
                            const x = onFulfilled(this.result);
                            executePromise(p1, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    break;
                case REJECTED:
                    runAsynctask(() => {
                        try {
                            const x = onRejected(this.result);
                            executePromise(p1, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    break;
                case PENDING:
                    this.#handlers.push({
                        onFulfilled: () => {
                            runAsynctask(() => {
                                try {
                                    const x = onFulfilled(this.result);
                                    executePromise(p1, x, resolve, reject);
                                } catch (error) {
                                    reject(error);
                                }

                            });
                        },
                        onRejected: () => {
                            runAsynctask(() => {
                                try {
                                    const x = onRejected(this.result);
                                    executePromise(p1, x, resolve, reject);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        }
                    });
                    break;
            }
        });
        return p1;
    }
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    finally(onFinally) {
        return this.then(onFinally, onFinally);
    }
}

export default wePromise;