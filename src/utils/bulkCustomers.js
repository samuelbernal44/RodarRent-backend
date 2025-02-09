const { faker } = require('@faker-js/faker');
const fs = require('fs');
const bcrypt = require('bcrypt')

const saltRounds = 10;
let customers = [];

for (let i = 0; i < 40; i++) {
  const name = faker.name.firstName();
  const customer = {
    name: name,    
    lastName: faker.name.lastName(),
    personalId: Math.ceil(Math.random()*10000000).toString(),    
    birthDate: faker.date.birthdate().toISOString().split('T')[0],
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country(),
    // country: 'Argentina',
    zipCode: faker.address.zipCode(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(name),
    password: faker.internet.password()
  };
  customers.push(customer);
}
const jsonCustomers = JSON.stringify(customers, null, 2);
fs.writeFileSync('customers.json', jsonCustomers);
console.log('Customers data has been written to customers.json');
//esta línea me hashea el pass que le paso como arg
// console.log(bcrypt.hashSync('Juancho023',saltRounds));
module.exports = customers;