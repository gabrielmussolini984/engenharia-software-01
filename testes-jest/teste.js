const obj = [{ name: "Gabriel" }, { name: "Joao" }, { name: "Marcos" }];

const item = obj.map((e) => { return e.name; }).indexOf("Felipe");
console.log(item)
// console.log(!!obj.find(element => element.name == "Gabriel"))