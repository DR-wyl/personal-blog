const baseUrl = 'http://127.0.0.1:3000';

export function weRequest(obj) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(obj.method, `${baseUrl}${obj.url}`);
        if (obj.responseType) xhr.responseType = obj.responseType;
        if (obj.setRequestHeader) {
            if (typeof obj.setRequestHeader === 'object') {
                Object.entries(obj.setRequestHeader).forEach((v) => {
                    xhr.setRequestHeader(v[0], v[1]);
                });
            } else {
                xhr.setRequestHeader('Content-Type', obj.setRequestHeader);
            }
        } else {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.onload = (a, b) => {
            console.log(typeof xhr.response);
            console.log(a, b);
            return resolve(xhr.response)
        };
        xhr.onerror = (err) => reject(err);
        if (obj.onprogress) {
            xhr.onprogress = (event) => {
                obj.onprogress(event);
            };
        }
        xhr.send(obj.requestBody);
    });
}

export default {};

/*
templateApiFun({
  method: 'POST',
  url: '/users/login',
  responseType: 'text',
  setRequestHeader: { 'Content-Type': 'application/json' },
  requestBody: data,
  onprogress: (event) => {
    console.log(event);
  },
});
*/
