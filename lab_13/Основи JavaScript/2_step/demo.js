let day = "Monday";
let month = "January";
let year = 2026;
console.log("Добрий день! Сьогодні " + day + " " + month + " " + year);

let x = 50;
let y = 10;
let sum = x + y;
console.log("Сума: " + sum);

let d = x * y;
console.log("Добуток: " + d);

let firstName = "dima";
let lastName = "Goshovskiy";
let age = 17;
console.log("Ім'я: " + firstName);
console.log("Прізвище: " + lastName);
console.log("Вік: " + age);

d = d / y 
x = x - d 
age = age + x 
console.log("Новий добуток: " + d);
console.log("Нове значення x: " + x);
console.log("Новий вік: " + age);

console.log( firstName + " " + lastName + ", " + age);

if (age >= 18) {
    console.log("Ви повнолітній.");
} 

else {
    console.log("Ви неповнолітній.");
}   
 
age = "18";
console.log (age == 18); // true, тому що оператор == порівнює значення і виконує неявне приведення типів
console.log (age === 18); // false, тому що оператор === порівнює як значення, так і типи, і в цьому випадку типи різні (рядок і число)

for (let i = 1; i <= 10; i++) { //ХЗ
    if (i % 2 !== 0) 
        console.log(i);
}
