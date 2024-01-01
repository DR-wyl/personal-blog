var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var arr000 = [1, 2, 3];
var arr011 = [1, 2, 3];
var d1 = { color: 'red', name: 'dog', height: 100 };
function gerCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var Person = /** @class */ (function () {
    function Person() {
        this.uname = 'jack';
        this.money = 100;
        this.age = 100;
    }
    Person.prototype.say = function () {
        console.log(this.uname);
        console.log(this.money);
    };
    return Person;
}());
var Son = /** @class */ (function (_super) {
    __extends(Son, _super);
    function Son() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Son.prototype.log = function () {
        // console.log(this.money); // 编译报错
        console.log(this.age);
    };
    return Son;
}(Person));
var p001 = new Person();
var s001 = new Son();
console.log(p001.uname);
// console.log(s001.money); // 编译报错
s001.say();
// console.log(s001.money); // 编译报错
var Person1 = /** @class */ (function () {
    function Person1() {
    }
    return Person1;
}());
// const p002 = new Person1(); // 编译报错
var Son2 = /** @class */ (function (_super) {
    __extends(Son2, _super);
    function Son2() {
        return _super.call(this) || this;
    }
    return Son2;
}(Person1));
var s002 = new Son2();
// 只读
var Person2 = /** @class */ (function () {
    function Person2(uname) {
        this.uname = uname;
    }
    return Person2;
}());
var p003 = new Person2('jack');
console.log(p003.uname);
var Person3 = /** @class */ (function () {
    function Person3(uname, age) {
        this.uname = uname;
        this.age = age;
    }
    return Person3;
}());
var p0002 = new Person3('jack', 18);
// 存取器
var Person4 = /** @class */ (function () {
    function Person4() {
        this.gender = 1;
    }
    Object.defineProperty(Person4.prototype, "Gender", {
        // getGender(){
        //     return this.gender;
        // }
        // setGender(gender:number){
        //     this.gender = gender;
        // }
        // 优化后写法
        get: function () {
            return this.gender;
        },
        set: function (gender) {
            this.gender = gender;
        },
        enumerable: false,
        configurable: true
    });
    return Person4;
}());
var p0004 = new Person4();
console.log(p0004.Gender);
p0004.Gender = 0;
console.log(p0004.Gender);
// 静态属性
var Person5 = /** @class */ (function () {
    function Person5() {
    }
    Person5.say = function () {
        console.log('hello');
    };
    Person5.uname = 'jack';
    return Person5;
}());
console.log(Person5.uname);
// 抽象类
var Person6 = /** @class */ (function () {
    function Person6() {
    }
    Person6.prototype.say1 = function () {
        console.log('hello');
    };
    return Person6;
}());
var Son6 = /** @class */ (function (_super) {
    __extends(Son6, _super);
    function Son6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Son6.prototype.say = function (a) {
        console.log('hello say');
    };
    return Son6;
}(Person6));
var SonI6 = /** @class */ (function () {
    function SonI6() {
    }
    SonI6.prototype.say = function (a) {
        console.log('hello say');
    };
    return SonI6;
}());
var Person7 = /** @class */ (function () {
    function Person7(uname, age) {
        this.uname = uname;
        this.age = age;
    }
    return Person7;
}());
var obj0001 = {
    uname: 'jack',
    age: 18,
    say: function () {
        console.log('hello say');
    },
    log: function () {
        console.log('hello log');
    }
};
var addFun;
addFun = function (a, b) {
    return a;
};
addFun = function (a) {
    return a;
};
// addFun(1) // 编译报错
addFun(1, 2);
var addFun01 = function (a, b) {
    return a + b;
};
var addFun02 = function (a, b) {
    if (b === void 0) { b = 100; }
    return a + b;
};
addFun02(1, 2);
addFun02(1);
var addFun03 = function (a, b) {
    if (b === void 0) { b = 100; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return a;
};
addFun03(1, 2, 3, 4, 5);
addFun03(1, 2);
addFun03(1);
function log1(x) {
    if (typeof x === 'number') {
        return 10 * x;
    }
    else if (typeof x === 'string') {
        return 'hello' + x;
    }
}
;
console.log(log1(2));
console.log(log1('jack'));
// 泛型
function log(x) {
    // console.log(x);
    return x;
}
log('hello');
log(123);
function swap(arr) {
    return [arr[1], arr[0]];
}
console.log(swap([1, 2]));
console.log(swap(['a', 'b']));
console.log(swap([' a ', 1]));
function getLen(x) {
    return x.length;
}
getLen({ length: 10 });
getLen([]);
var u1 = {
    uname: 'jack',
    age: 20,
    gender: 'male'
};
var say;
say = function (x, y) {
    return y.age;
};
// 类中使用泛型
var Users = /** @class */ (function () {
    function Users(name) {
        this.name = name;
    }
    return Users;
}());
var p002 = new Users('jack');
console.log(p002.name);
// 枚举
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["E"] = 1] = "E";
    Direction[Direction["S"] = 2] = "S";
    Direction[Direction["W"] = 3] = "W";
})(Direction || (Direction = {}));
console.log(Direction.N);
console.log(0 /* Direction2.N */);
