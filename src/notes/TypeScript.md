# TypeScript

## 安装

`npm install -g typescript`

## 检验安装

`tsc -v`

## 编译

### 对指定ts文件进行编译

`tsc xxx.ts`

### 自动编译指定ts文件

> 当文件被修改时自动编译

`tsc xxx.ts -w`

## 数据类型

### 基本数据

```typescript
let num1:number = 10;
let str:string = '123';
let str1:string = `123 ${str}`;
let bool:boolean = true;
```

### 数组

```typescript
const arr0 = [1,2,3];
const arr01:Array<number> = [1,2,3];
const arr02:number[] = [1,2,3];
```

### Tuple 元组

```typescript
const arr1:any = ['jack',1,true];
const arr10:[string,number,boolean] = ['jack',1,true];
```

### enum 枚举类型

```typescript
enum gender {
    boy,
    girl
}
let gender1:gender = gender.boy;
let gender2:gender = gender.girl;
console.log(gender);
enum color {
    red = 100,
    green = 200,
}
console.log(color);
```

#### 转js后源码

```javascript
var gender;
(function (gender) {
    gender[gender["boy"] = 0] = "boy";
    gender[gender["girl"] = 1] = "girl";
})(gender || (gender = {}));
var gender1 = gender.boy;
var gender2 = gender.girl;
console.log(gender);
var color;
(function (color) {
    color[color["red"] = 100] = "red";
    color[color["green"] = 200] = "green";
})(color || (color = {}));
console.log(color);
```

### any 任意类型

类型检查器不对这些值进行检查而是直接让其通过编译

只声明未初始化的值被定义为any类型

```typescript
let xx;
let arrx:any[] = [1,true,'hello'];
```

### Object类型

与any类型类似，因为js万物皆对象，但其定义出来的变量只能使用Object上的方法

```typescript
let x:Object = 1;
x = 'jack';
```

### object类型

标识非原始类型(不可为原始数据类型),也就是除number,string,boolean,symbol,null或undefined之外的类型。

```typescript
let obj:object = {};
```

### void类型

空类型，只能为null或者undefined

```typescript
let no:void = null;
let no1:void = undefined;
```

一般用于无返回值的函数

```typescript
function myLog():void{
    return;
}
```

### never类型

never类型标识永远不存在值的类型，用于抛出异常或者根本就不会有返回值的函数

> never是任何类型的子类型。也就是说never类型数据可以被赋值给其他变量，反之不行。

```typescript
function error(message:string):never{
    throw new Error(message);
}
function infiniteLoop():never{
    while(true){
    }
}
```

## 类型断言

> 通过类型断言的方式告诉编译器”相信我，我知道自己在干什么“。告诉编译器在当前行这个变量是什么类型。类型断言主要是如下方式。

### 类型断言-尖括号

```typescript
let strTest:any = 'hello world';
(<string>strTest).length;
```

### 类型断言-as

**JPX写法只支持as**

```typescript
let strTest:any = 'hello world';
(strTest as string).length;
```

## 接口

### 一般定义

```typescript
interface LabelValue{
    width:number,
    text:string,
}

function printLabel(label:LabelValue):void{
    label.width;
    label.text;
}

printLabel({width:100,text:'hello world'});
```

### 可选属性

```typescript
interface SquareConfig{
    color?:string;
    width?:number;
}

let s0:SquareConfig = {color:'red',width:100};
let s1:SquareConfig = {color:'red'};
let s2:SquareConfig = {width:200};
```

### 只读属性

```typescript
interface Point{
    readonly x:number;
    readonly y:number;
}

const p1:Point = {x:100,y:200};
```

## 只读数组

不允许修改，不允许赋值给其他变量。

```typescript
let arr:ReadonlyArray<number> = [1,2,3,4];
```

可使用断言来重写

```typescript
let aa:Array<number> = arr as number[];
```

## 额外的类型检查

定义接口后，如果定义的变量出现了超过接口所定义的类型，会触发额外的类型检查机制，进而报错。案例如下。

```typescript
interface SquareConfigS{
    color?:string;
    width?:number;
}
let s111:SquareConfigS = {width:100,color:'red',height:200};
```

跳过额外类型检查的方案

```typescript
interface SquareConfigS{
    color?:string;
    width?:number;
}

let s111:SquareConfigS = {width:100,color:'red',height:200} as SquareConfigS;
```

```typescript
interface SquareConfigS{
    color?:string;
    width?:number;
}
let aaa = {width:100,color:'red',height:200}
let s111:SquareConfigS =  aaa;
```

采用索引

```typescript
interface SquareConfigS{
    color?:string;
    width?:number;
    [props:string]:any;
}

let s111:SquareConfigS = {width:100,color:'red',height:200};
```

## 定义函数类型的接口

函数的参数名不需要与接口里定义的名字相匹配

```typescript
interface AddFun{
    (a:number,b:number):number;
}


function add(a:number,b:number):number{
    return a+b;
}

function abc(x:number,y:number){
    return x-y/3;
}
let a:AddFun;
a= add
a= abc
```

## 可索引的类型

>TypeScript支持两种索引签名
>
>- 字符串
>- 数字 

### 数字索引

>在下案例中 `StringArray` `Array<string>` `string[]` 三种声明方式是等价的。

```typescript
interface StringArray {
    [index:number]:string;
}
// let a1:StringArray = ['a','b'];
// let a1:Array<string> = ['a','b'];
let a1:string[] = ['a','b'];
```

### 字符串索引

> 在下案例中 `MyObj` `object` 声明是等价的。

```javascript
interface MyObj {
    [props:string]:any;
}

let obj1: MyObj = {
    width:100,
    height:'200'
}
```

### 同时使用两种类型的索引的情况

> number索引签名声明的值，需是string索引签名声明的值的子类型。
>
> 在下案例中`number`是`number`的子类型，`number`是`Object`的子类型。

```typescript
interface MixinType{
    [x:string]:number;
    [y:number]:number;
}
interface MixinType1{
    [x:string]:Object;
    [y:number]:number;
}
```

### 将索引签名设置为只读

> 在下案例中 `ReadOnlyArr` `ReadonlyArray<number`等价

```typescript
interface ReadOnlyArr{
    readonly [index:number]:number
}
  
let arr000:ReadOnlyArr=[1,2,3];
let arr011:ReadonlyArray<number> = [1,2,3];
```



## 类类型

> 使用接口描述类属性

接口描述了类的公共部分

- 不会检查类是否具有某些私有成员
- constructor存在于类的静态部分，所有不在检查的范围内

```typescript
interface AnimalClass{
    name:string;
    eat(food:string):void;
}

class Animal implements AnimalClass{
    name = 'dog';
    eat(food:string){
        return;
    }
}
```

## 接口继承

### 单接口继承

```typescript
interface Animal {
    name:string;
}

interface Dog extends Animal{
    color:string;
}

let d1:Dog = {color:'red',name:'dog'};
```

### 继承多个接口

```typescript
interface Ani {
    name:string;
}

interface Sw {
    height:number;
}

interface Dog extends Ani,Sw{
    color:string;
}

let d1:Dog = {color:'red',name:'dog',height:100};
```

### 混合类型

一个对象可以同时作为函数和对象使用，并带有额外的属性

```typescript
interface Counter{
    (start:number):string;
    interval:number;
    reset():void;
}
function gerCounter():Counter{
    let counter = <Counter>function(start:number){};
    counter.interval = 123;
    counter.reset = function(){};
    return counter;
}
```

## 类定义

### public修饰符

> 在`TypeScript`里，成员都默认为`public`。也可以明确的将一个成员标记成`public`。

### private修饰符

> 当成员被标记成`private`时，它就不能在声明它的类的外部访问。

### protected修饰符

> `protected`修饰符与`private`修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。

### 三者区分

>- `public`修饰的，可在<kbd>类中</kbd>、<kbd>派生类</kbd>和<kbd>外部</kbd>调用。
>- `private`修饰的，仅可被<kbd>类中</kbd>其他函数调用。
>- `protected`修饰的，不可在外部调用，但可在<kbd>类中</kbd>或<kbd>派生类中</kbd>其他函数调用。

#### 访问权限

| 修饰符         | 当前类 | 子类   | 外部   |
| -------------- | ------ | ------ | ------ |
| public/defaule | 可以   | 可以   | 可以   |
| protected      | 可以   | 可以   | 不可以 |
| private        | 可以   | 不可以 | 不可以 |

#### 案例


```typescript
class Person {
    public uname = 'jack';
    private money = 100;
    protected age = 100;
    public say() {
        console.log(this.uname);
        console.log(this.money);
    }
}

class Son extends Person {
    log(){
        // console.log(this.money); // 编译报错
        console.log(this.age);
    }
 }

const p001 = new Person();
const s001 = new Son();

console.log(p001.uname);
// console.log(s001.money); // 编译报错
s001.say();
// console.log(s001.money); // 编译报错
```

### 构造函数也可以被标记成`protocted`

这意味着这个类不能在包含它的类外被实例化，但是能被继承。

```typescript
class Person1{
    protected constructor(){}
}

// const p002 = new Person1(); // 编译报错

class Son2 extends Person1{
    constructor(){
        super();
    }
}

const s002 = new Son2();
```

### readonly 修饰符

你可以使用`readonly`关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```typescript
class Person2{
    readonly uname:string;
    constructor(uname:string){
        this.uname = uname;
    }
}
const p003 = new Person2('jack');

console.log(p003.uname);
```

### 参数属性

参数属性可以方便地在一个地方定义并初始化一个成员。

```typescript
class Person3{
    constructor(public uname:string,private readonly age:number){}
}

const p0002 = new Person3('jack',18);
```

### 存取器



```typescript
// 存取器
class Person4{
    private gender:number = 1;
    // getGender(){
    //     return this.gender;
    // }
    // setGender(gender:number){
    //     this.gender = gender;
    // }
    // 优化后写法
    get Gender(){
        return this.gender;
    }
    set Gender(gender:number){
        this.gender = gender;
    }
}
const p0004 = new Person4();
console.log(p0004.Gender);
p0004.Gender = 0;
console.log(p0004.Gender);
```

### 静态属性

可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。

```typescript
// 静态属性
class Person5 {
    static uname: string = 'jack';
    static say() {
        console.log('hello');
    }
}

console.log(Person5.uname);
```

### 抽象类

抽象类做为其它派生类的基类使用。它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。

#### 抽象方法

抽象方法的语法与接口方法相似。抽象方法必须包含`abstract`关键字并且可以包含访问修饰符。

```typescript
// 抽象类
abstract class Person6 {
    uname: string;

    abstract say(a: number): void;
    say1() {
        console.log('hello');
    }
}

class Son6 extends Person6 {
    say(a: number): void {
        console.log('hello say');
    }
}
```

### 接口可以继承class

本质把类当作接口使用

```typescript
class Person7{
    uname: string;
    age: number;
    constructor(uname: string, age: number) {
        this.uname = uname;
        this.age = age;
    }
}

interface IPerson7 extends Person7{
    say(): void;
    log(): void;
}

let obj0001: IPerson7 = {
    uname: 'jack',
    age: 18,
    say() {
        console.log('hello say');
    },
    log() {
        console.log('hello log');
    }
}
```

## 函数

```typescript
let addFun:(a: number, b: number)=>number;

addFun = function (a: number, b: number){
    return a;
}
addFun = function (a: number){
    return a;
}

// addFun(1) // 编译报错
addFun(1,2)
```

### 用接口描述

```typescript
interface IAdd {
    (a: number, b: number): void;
    // 设void为返回值比较特殊，意味着这个函数可以没有返回值，也可以有返回值
}

let addFun01 = function (a: number, b: number): number {
    return a + b
}
```

### 设置默认值

```typescript
// 默认值
interface IAdd2 {
    (a: number, b?: number): void;
}

let addFun02 = function (a: number, b: number=100): number {
    return a + b
}
addFun02(1, 2)
addFun02(1)
```

### 设置省略参数

```typescript
// 剩余参数
interface IAdd3 {
    (a: number, b?: number,...rest:number[]): void;
}

let addFun03 = function (a: number, b: number=100,...rest:number[]): number {
    return a
}
addFun03(1, 2, 3, 4, 5)
addFun03(1, 2)
addFun03(1)
```

### 函数重载

```typescript
// 函数重载
function log1(x:number):number;
function log1(x:string):string;
function log1(x:any):any{
    if(typeof x === 'number'){
        return 10 * x;
    }else if(typeof x === 'string'){
        return 'hello' + x;
    }
};

console.log(log1(2));
console.log(log1('jack'));
```

## 泛型

```typescript
function log<T>(x: T): T {
    // console.log(x);
    return x;
}
log<string>('hello');
log<number>(123);
```



```typescript
function swap<T, U>(arr: [T, U]) {
    return [arr[1], arr[0]]
}

console.log(swap<number, number>([1, 2]));
console.log(swap<string, string>(['a', 'b']));
console.log(swap<string, number>([' a ', 1]));
```

### 对泛型进行约束

```typescript
function getLen<T extends {length:number}>(x:T){
    return x.length;
}

getLen({length:10});
getLen([]);
```

### 在接口上使用泛型

```typescript
interface User1<T,U>{
    uname:string;
    age:T;
    gender:U;
}

let u1:User1<number,string> = {
    uname:'jack',
    age:20,
    gender:'male'
}
```

### 描述函数

```typescript
interface User {
    uname: string;
    age: number;
}

interface Func1<T> {
    <K extends User>(x: T, y: K): T;
}
let say: Func1<number>;
say = function <K extends User>(x: number, y: K): number {
    return y.age;
}
```

### 类中使用泛型

```typescript
class Users<T> {
    name: T;
    constructor(name: T) {
        this.name = name;
    }
}
const p002 = new Users<string>('jack')
console.log(p002.name);

```

### 泛型默认值

```typescript
class Users<T = string> {
    name: T;
    constructor(name: T) {
        this.name = name;
    }
}
```

## 枚举

```typescript
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
```

### 编译后源码显示

```javascript
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["E"] = 1] = "E";
    Direction[Direction["S"] = 2] = "S";
    Direction[Direction["W"] = 3] = "W";
})(Direction || (Direction = {}));
console.log(Direction.N);
console.log(0 /* Direction2.N */);
```

## 类型推论

TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。

```typescript
let x = 0;
```

变量`x`的类型被推断为数字。这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。



没有赋值的变量，其类型会被推论为`any`，即便后续赋值为其他类型，也不会改变这个推论。
