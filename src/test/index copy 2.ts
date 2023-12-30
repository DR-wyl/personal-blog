interface StringArray {
    // 0: string;
    // 1: string;
    // length: 2;
    [index:number]:string;
}

// let a1:StringArray = ['a','b'];
// let a1:Array<string> = ['a','b'];
let a1:string[] = ['a','b'];


interface MyObj {
    [props:string]:any;
}

let obj1: object = {
    width:100,
    height:'200'
}