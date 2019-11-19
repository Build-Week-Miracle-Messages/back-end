Welcome to Miracle Message Endpoint


** Base URL ==> https://miracle-message.herokuapp.com/ **


Registering a User --> /api/auth/register

SEND:
 {
"name":"Bill",
"username":"lamdbastudent",
"password":"1234",
"email":"fakeemai@yahoo.com"
}

username and email MUST be unique!

SUCCESS **201 Created**

RECEIVE:
{
  "id": 7,
  "username": "lamdbastudent"
}


Logging In --> /api/auth/login

SEND:
{
"username":"lamdbastudent",
"password":"1234"
}

SUCCESS 200 OK

RECEIVE

{
  "id": 7,
  "name": "Bill",
  "username": "lamdbastudent",
  "email": "fakeemai@yahoo.com",
  "password": "$2a$08$e6LRGwfBOiJN.8P.FpHBcudWzPAy/pFq5HFgd1j/zIvSCQ50xppay",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJuYW1lIjoibGFtZGJhc3R1ZGVudCIsImlhdCI6MTU3NDE0OTEzMjMyMywiZXhwIjoxNTc0MTQ5MjE4NzIzfQ.ix3JJ9tRj7ucSJaAUbIjKSzVYQlmutmx5LsvKu0IKqw"
}





