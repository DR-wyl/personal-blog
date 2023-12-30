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

