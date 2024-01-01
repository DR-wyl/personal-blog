let num1:number = 10;
let str:string = '123';
let str1:string = `123 ${str}`;
let bool:boolean = true;

const arr0 = [1,2,3];
const arr01:Array<number> = [1,2,3];
const arr02:number[] = [1,2,3];

// Tuple 元组

const arr1:any = ['jack',1,true];
const arr10:[string,number,boolean] = ['jack',1,true];

// Enum 枚举类型
enum gender {
    boy,
    girl
}
/* 
    // 转js后实现源码
    var gender;
    (function (gender) {
        gender[gender["boy"] = 0] = "boy";
        gender[gender["girl"] = 1] = "girl";
    })(gender || (gender = {}));
*/
let gender1:gender = gender.boy;
let gender2:gender = gender.girl;
console.log(gender);


enum color {
    red = 100,
    green = 200,
}
console.log(color);

// Any 任意类型
// 类型检查器不对这些值进行检查而是直接让其通过编译
// 只声明未初始化的值被定义为any类型

// Object类型
// 与Any类型类似，因为js万物皆对象，但其定义出来的变量只能使用Object上的方法
let x:Object = 1;
x = 'jack';

let arrx:any[] = [1,true,'hello'];

let no:void = null;
let no1:void = undefined;

function myLog():void{
    return;
}

function error(message:string):never{
    throw new Error(message);
}
function infiniteLoop():never{
    while(true){
    }
}

let obj:object = {};

let strTest:any = 'hello world';
(<string>strTest).length;
(strTest as string).length;

/* 
    1.描述变量的具体类型

*/
interface LabelValue{
    width:number;
    text:string;
}

function printLabel(label:LabelValue):void{
    label.width;
    label.text;
}

printLabel({width:100,text:'hello world'});


interface SquareConfig{
    color?:string;
    width?:number;
}

let s0:SquareConfig = {color:'red',width:100};
let s1:SquareConfig = {color:'red'};
let s2:SquareConfig = {width:200};


interface Point{
    readonly x:number;
    readonly y:number;
}

const p1:Point = {x:100,y:200};

let arr:ReadonlyArray<number> = [1,2,3,4];
let aa:Array<number> = arr as number[];
// let aa:Array<number> = [...arr];


interface SquareConfigS{
    color?:string;
    width?:number;
    [props:string]:any;
}
// let aaa = {width:100,color:'red',height:200}
// let s111:SquareConfigS =  aaa;
let s111:SquareConfigS = {width:100,color:'red',height:200};
// let s111:SquareConfigS =  aaa;


interface AddFun{
    (a:number,b:number):number;
}

function add(a:number,b:number):number{
    return a+b;
}

function abc(x:number,y:number){
    return x-y/3;
}

function log(str:string):string{
    return str;
}
let a:AddFun;
a= add
a= abc
// a= log
// let a = log; 