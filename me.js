let people = [];

class Person {
  constructor(user, favNo) {
    this.user = user;
    this.favNo = favNo;
  }
}

function createPerson(user, favNo) {
  const newPerson = new Person(user, favNo);
  people.push(newPerson);
}

createPerson("Jahred", 28);

console.log(people);
