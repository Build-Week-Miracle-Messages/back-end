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

RECEIVE:

{
  "id": 7,
  "name": "Bill",
  "username": "lamdbastudent",
  "email": "fakeemai@yahoo.com",
  "password": "$2a$08$e6LRGwfBOiJN.8P.FpHBcudWzPAy/pFq5HFgd1j/zIvSCQ50xppay",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJuYW1lIjoibGFtZGJhc3R1ZGVudCIsImlhdCI6MTU3NDE0OTEzMjMyMywiZXhwIjoxNTc0MTQ5MjE4NzIzfQ.ix3JJ9tRj7ucSJaAUbIjKSzVYQlmutmx5LsvKu0IKqw"
}


CREATING A CASE --> /api/cases

**Notes**

A form with the following information will be needed create a case

name: string, required
age: integer, required
home_town: string, required
current_city: string, required
contact: string, optional
sensitve: Boolean, required

**Important if a homeless person has a connect they must be sent in the same request in this syntax**

connect_name: string, required
connect_age: integer
connect_relationship, required
connect_location, required  

SEND: 

{
"name":"bill",
"age": 34,
"home_town": "los angeles",
"current_city": "Dallas",
"contact": "uzias@gmail.com",
"sensitive": false,
"connect_name": "uzias",
"connect_relationship": "brother",
"connect_location": "peru"
}

SUCCESS 200 OK

RECEIVE:

[
  {
    "id": 7,
    "name": "bill",
    "age": 34,
    "home_town": "los angeles",
    "current_city": "Dallas",
    "contact": "uzias@gmail.com"
  }
]


GET USER CASES AND PUBLIC ==> /api/cases/all

RECEIVE 200

[
  {
    "id": 1,
    "name": "Bill",
    "age": 25,
    "home_town": "los angeles",
    "current_city": "san jose",
    "contact": "1234567898"
  },
  ...
 ]

 
 GET USER CASES ==> /api/cases/current_city
 
 RECEIVE 200
 
 [
  {
    "id": 1,
    "name": "Bill",
    "age": 25,
    "home_town": "los angeles",
    "current_city": "san jose",
    "contact": "1234567898"
  },
  ...
  ]
  
  
  DELETE CASE ==> /api/cases/:id 
  
  :id is the case id
  
  if the case does not belong to the user, the case will not be deleted. Once successful, an array of the users current cases will return
  
  SUCCESS RECEIVE 200:
  
  [
  {
    "id": 1,
    "name": "Bill",
    "age": 25,
    "home_town": "los angeles",
    "current_city": "san jose",
    "contact": "1234567898"
  },
  ...
  ]

