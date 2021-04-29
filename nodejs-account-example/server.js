/**
 * Endpoints
 * 
 * URL: /api/login
 * Method: POST
 * Body: användarnamn och lösenord
 * 
 * URL: /api/signup
 * Method: POST
 * Body: användarnamn, lösenord och e-post
 */

/**
 * Databas
 * 
 * Vad är databasen till för?
 * Vi vill spara användarkonton och kunna validera användarnamn och lösenord.
 * 
 * Vad vill spara för data?
 * Vi vill spara användarnamn, lösenord och e-post. Varje användarnamn och e-post ska vara unika.
 * 
 * Vad är det för typ av data vi vill spara?
 * Det är en array där varje användarkonto är ett objekt.
 * 
 * Ex: 
 *   {
 *      accounts: [
 *          {
 *            username: String
 *            email: String
 *            password: String
 *          }
 *      ]
 *   }
 */

const lowdb = require('lowdb');
const express = require('express');
const bcrypt = require('bcrypt');
const FileSync = require('lowdb/adapters/FileSync');
const saltRounds = 10;

//Kryptering av lösenord med bcrypt - OBS! Ingår ej kursen utan för intresse
// bcrypt.hash('pwd123', saltRounds, (error, hash) => {
//   console.log('hash:', hash);
//   bcrypt.compare('dwaaw123', hash, (error, result) => {
//     console.log('Lösenord korrekt?', result);
//   });
// });

const adapter = new FileSync('accounts.json');
const database = lowdb(adapter);

const app = express();

app.use(express.json());

function initiateDatabase() {
  database.defaults({ accounts: [] }).write();
}

//body ser ut såhär: { username: 'Chris', email: 'chris@chris.se', password: 'pwd123' }
app.post('/api/signup', (request, response) => {
  const account = request.body;
  console.log('Konto att lägga till:', account);

  //Kollar om användarnamn eller e-post redan finns i databasen
  const usernameExists = database.get('accounts').find({ username: account.username }).value();
  const emailExists = database.get('accounts').find({ email: account.email }).value();

  console.log('usernameExists:', usernameExists);
  console.log('emailExists', emailExists);

  const result = {
    success: false,
    usernameExists: false,
    emailExists: false
  }

  //Om användarnamnet redan finns i databasen
  if (usernameExists) {
    result.usernameExists = true;
  }

  //Om e-post redan finns i databasen
  if (emailExists) {
    result.emailExists = true;
  }

  if (!result.usernameExists && !result.emailExists) {
    database.get('accounts').push(account).write();
    result.success = true;
  }

  response.json(result);
});

//body kommer se ut såhär: { username: 'Chris', password: 'pwd123' }
app.post('/api/login', (request, response) => {
  const loginCredentials = request.body;
  console.log('loginCredentials:', loginCredentials);

  const compareCredentials = database.get('accounts')
                              .find({ username: loginCredentials.username, password: loginCredentials.password })
                              .value();
  console.log('compareCredentials:', compareCredentials);

  const result = {
    success: false
  }

  //Ifall användarnamn och lösenord är samma som i databasen
  if (compareCredentials) {
    result.success = true;
  }

  response.json(result);
});

app.listen(8000, () => {
  console.log('Server started');
  initiateDatabase();
});

