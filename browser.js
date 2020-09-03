class Student {
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }
  say(){
    console.log(`i am ${this.name} i am ${this.age}`);
  }
}
function add(a,b) {
  return  a+b;
}

const Jupiter = new Student('Jupiter', 18);

exports.Jupiter = Jupiter;
exports.age =123