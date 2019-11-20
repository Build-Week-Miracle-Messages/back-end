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

{
  "id": 14,
  "name": "bill",
  "age": 34,
  "home_town": "los angeles",
  "current_city": "Dallas",
  "contact": "uzias@gmail.com",
  "connect": [
    {
      "id": 14,
      "person_id": 14,
      "name": "uzias",
      "age": null,
      "relationship": "brother",
      "location": "peru"
    }
  ]
}


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

 
 GET USER CASES ==> /api/cases/current
 
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
  
  GET PERSON AND CONNECT BY PERSON ID ==> /api/cases/:id
  
  RECEIVE 200
  
  {
  "id": 2,
  "name": "Jose",
  "age": 35,
  "home_town": "dallas",
  "current_city": "memphis",
  "contact": "jose@gmail.com",
  "connect": [
    {
      "id": 2,
      "person_id": 2,
      "name": "Ernie",
      "age": null,
      "relationship": "friend",
      "location": null
    }
  ]
}
  
  
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
  
  
PUT PERSON ==> /api/cases/person/:id

:id is the person id

If the user has the person for case, the person can be updated

"name": 
"age":
"home_town":
"current_city":
"contact":

SEND IN ANY OF THE FOLLOWING CHANGED FOR PUT TO WORK

SEND:

{"age":"100", "name":"Jules"}

RECEIVE 201 

[
  {
    "id": 1,
    "name": "Jules",
    "age": 100,
    "home_town": "los angeles",
    "current_city": "san jose",
    "contact": "1234567898"
  }
]


POST MISSING- no login needed ==> /api/missing

all fields required

SEND:
{
"name":"peter",
"age":23,
"home_town":"anaheim", 
"contact":"1232312314"
}

RECEIVE 201

[
  {
    "id": 8,
    "name": "peter",
    "age": 23,
    "home_town": "anaheim",
    "contact": "1232312314"
  }
]

GET ALL MISSING - no login needed ==> /api/missing

RECEIVE 200

[
  {
    "id": 1,
    "name": "peter",
    "age": 23,
    "home_town": "anaheim",
    "contact": "1232312314"
  },
  ...
]