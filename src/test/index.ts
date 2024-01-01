// interface MixinType {
//     [x: string]: number;
//     [y: number]: number;
// }
// interface MixinType1 {
//     [x: string]: Object;
//     [y: number]: number;
// }

// interface ReadOnlyArr {
//     readonly [index: number]: number
// }

// let arr000: ReadOnlyArr = [1, 2, 3];
// let arr011: ReadonlyArray<number> = [1, 2, 3];

// // arr000[0]=100;
// // arr011[0]=100;


// /* 
//     同时使用两种类型的索引
//     number索引签名声明的值，需是string索引签名声明的值的子类型
// */

// // interface AnimalClass{
// //     name:string;
// //     eat(food:string):void;
// // }

// // class Animal implements AnimalClass{
// //     name = 'dog';
// //     eat(food:string){
// //         return;
// //     }
// // }


// // 继承多个接口
// interface Ani {
//     name: string;
// }

// interface Sw {
//     height: number;
// }

// interface Dog extends Ani, Sw {
//     color: string;
// }

// let d1: Dog = { color: 'red', name: 'dog', height: 100 };


// // 混合类型

// // interface MixinObj{
// //     (x:number,y:number):void;
// //     uname:string;
// //     say():void;
// // }

// // let person000:MixinObj =<MixinObj>function(x:number,y:number) {
// //     return ;
// // }
// // person000.uname = 'person';
// // person000.say = function() {}


// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }
// function gerCounter(): Counter {
//     let counter = <Counter>function (start: number) { };
//     counter.interval = 123;
//     counter.reset = function () { };
//     return counter;
// }

// class Person {
//     public uname = 'jack';
//     private money = 100;
//     protected age = 100;
//     public say() {
//         console.log(this.uname);
//         console.log(this.money);
//     }
// }

// class Son extends Person {
//     log() {
//         // console.log(this.money); // 编译报错
//         console.log(this.age);
//     }
// }

// const p001 = new Person();
// const s001 = new Son();

// console.log(p001.uname);
// // console.log(s001.money); // 编译报错
// s001.say();
// // console.log(s001.money); // 编译报错

// class Person1 {
//     protected constructor() { }
// }

// // const p002 = new Person1(); // 编译报错

// class Son2 extends Person1 {
//     constructor() {
//         super();
//     }
// }

// const s002 = new Son2();


// // 只读
// class Person2 {
//     readonly uname: string;
//     constructor(uname: string) {
//         this.uname = uname;
//     }
// }
// const p003 = new Person2('jack');

// console.log(p003.uname);

// class Person3 {
//     constructor(public uname: string, private readonly age: number) { }
// }

// const p0002 = new Person3('jack', 18);

// // 存取器

// class Person4 {
//     private gender: number = 1;
//     // getGender(){
//     //     return this.gender;
//     // }
//     // setGender(gender:number){
//     //     this.gender = gender;
//     // }
//     // 优化后写法
//     get Gender() {
//         return this.gender;
//     }
//     set Gender(gender: number) {
//         this.gender = gender;
//     }
// }

// const p0004 = new Person4();
// console.log(p0004.Gender);
// p0004.Gender = 0;
// console.log(p0004.Gender);

// // 静态属性
// class Person5 {
//     static uname: string = 'jack';
//     static say() {
//         console.log('hello');
//     }
// }

// console.log(Person5.uname);


// interface IPerson6 {
//     uname: string;
//     say(a: number): void;
// }

// // 抽象类
// abstract class Person6 {
//     uname: string;

//     abstract say(a: number): void;
//     say1() {
//         console.log('hello');
//     }
// }

// class Son6 extends Person6 {
//     say(a: number): void {
//         console.log('hello say');
//     }
// }

// class SonI6 implements IPerson6 {
//     uname: string;
//     say(a: number): void {
//         console.log('hello say');
//     }
// }

// class Person7 {
//     uname: string;
//     age: number;
//     constructor(uname: string, age: number) {
//         this.uname = uname;
//         this.age = age;
//     }
// }

// interface IPerson7 extends Person7 {
//     say(): void;
//     log(): void;
// }

// let obj0001: IPerson7 = {
//     uname: 'jack',
//     age: 18,
//     say() {
//         console.log('hello say');
//     },
//     log() {
//         console.log('hello log');
//     }
// }

// let addFun: (a: number, b: number) => number;

// addFun = function (a: number, b: number) {
//     return a;
// }
// addFun = function (a: number) {
//     return a;
// }

// // addFun(1) // 编译报错
// addFun(1, 2)

// interface IAdd {
//     (a: number, b: number): void;
// }

// let addFun01 = function (a: number, b: number): number {
//     return a + b
// }
// // 默认值
// interface IAdd2 {
//     (a: number, b?: number): void;
// }

// let addFun02 = function (a: number, b: number = 100): number {
//     return a + b
// }
// addFun02(1, 2)
// addFun02(1)

// // 剩余参数
// interface IAdd3 {
//     (a: number, b?: number, ...rest: number[]): void;
// }

// let addFun03 = function (a: number, b: number = 100, ...rest: number[]): number {
//     return a
// }
// addFun03(1, 2, 3, 4, 5)
// addFun03(1, 2)
// addFun03(1)

// // 函数重载
// function log1(x: number): number;
// function log1(x: string): string;
// function log1(x: any): any {
//     if (typeof x === 'number') {
//         return 10 * x;
//     } else if (typeof x === 'string') {
//         return 'hello' + x;
//     }
// };

// console.log(log1(2));
// console.log(log1('jack'));

// // 泛型
// function log<T>(x: T): T {
//     // console.log(x);
//     return x;
// }
// log<string>('hello');
// log<number>(123);


// function swap<T, U>(arr: [T, U]) {
//     return [arr[1], arr[0]]
// }

// console.log(swap<number, number>([1, 2]));
// console.log(swap<string, string>(['a', 'b']));
// console.log(swap<string, number>([' a ', 1]));

// function getLen<T extends { length: number }>(x: T) {
//     return x.length;
// }

// getLen({ length: 10 });
// getLen([]);

// interface User1<T, U> {
//     uname: string;
//     age: T;
//     gender: U;
// }

// let u1: User1<number, string> = {
//     uname: 'jack',
//     age: 20,
//     gender: 'male'
// }

// interface User2<T, U> {
//     uname: string;
//     age: number;
//     gender: U;
// }

// interface User {
//     uname: string;
//     age: number;
// }

// interface Func1<T> {
//     <K extends User>(x: T, y: K): T;
// }
// let say: Func1<number>;
// say = function <K extends User>(x: number, y: K): number {
//     return y.age;
// }

// // 类中使用泛型
// class Users<T = string> {
//     name: T;
//     constructor(name: T) {
//         this.name = name;
//     }
// }
// const p002 = new Users<string>('jack')
// console.log(p002.name);

// 枚举
enum Direction {
    N, 
    E, 
    S, 
    W
}
// const 枚举
const enum Direction2{
    N, E, S, W
}

console.log(Direction.N);
console.log(Direction2.N);
