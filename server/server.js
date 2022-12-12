const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

let people = [
  {
    name: 'Pasha',
    age: 16,
    sign: 'Who knows',
  },
  {
    name: 'Artemis',
    age: 16,
    sign: "Still don't know",
  },
]

let name = 'sexy'

const schema = buildSchema(`
type Person {
  name: String
  age: Int
  sign: String
 }

 input newPersonInput {
  name: String!
  age: Int!
  sign: String!
 }

 type Query {
  hello: String
  retreivePeople: [Person]
 }

 type Mutation {
  addPerson(person: newPersonInput):Person
 }
`)

const root = {
  hello: () => {
    return 'Cutie'
  },
  retreivePeople: () => {
    return people
  },
  addPerson: (args) => {
    const { person } = args
    people.push(person)
    console.log(person)
    return person
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
)

app.listen(4000, () => {
  console.log('WEB app has started')
})
