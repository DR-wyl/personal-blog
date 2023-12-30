interface MixinType{
    [x:string]:number;
    [y:number]:number;
}
interface MixinType1{
    [x:string]:Object;
    [y:number]:number;
}

interface ReadOnlyArr{
    readonly [index:number]:number
}

let arr000:ReadOnlyArr=[1,2,3];
let arr011:ReadonlyArray<number> = [1,2,3];

// arr000[0]=100;
// arr011[0]=100;


/* 
    同时使用两种类型的索引
    number索引签名声明的值，需是string索引签名声明的值的子类型
*/

interface AnimalClass{
    name:string;
}

class Animal implements AnimalClass{
    name = 'dog';
    constructor(){}
}