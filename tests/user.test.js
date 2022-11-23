const test = require('tape')

const InMemoryStore = require('../store/in-memory')
const AppService = require('../app/AppService')

const testTerms = [
  { id: 1, original: 'tag', translation: 'وسم' },
  { id: 2, original: 'attribute', translation: 'خاصية' },
]

let createdUserId = ''

// Users Service Tests
test('Users Service tests', async (t) => {
  const store = new InMemoryStore({ terms: testTerms })
  const appService = new AppService(store)

  t.test('sign up user', async (t) => {
    const createdUser = await appService.signUpUser({
      username: 'john_doe',
      email: 'john@doe.com',
      password: 'password',
    })
    createdUserId = createdUser.id
    const fetchedUser = await appService.getUser({ id: createdUser.id })
    t.equal(
      createdUser.id,
      fetchedUser.id,
      'sign up should add a user to the DB'
    )

    try {
      await appService.signUpUser({
        username: 'john_doe',
        email: 'john@doe.com',
        password: 'password',
      })
      t.fail("don't accept two users with the same email")
    } catch {
      t.pass("don't accept two users with the same email")
    }
  })

  test('get user', async (t) => {
    const user1 = await appService.getUser({ email: 'john@doe.com' })
    t.ok(user1.id, 'A user can be got by email')

    const user2 = await appService.getUser({ id: createdUserId })
    t.ok(user2.id, 'A user can be got by id')
  })

  test('sign in user', async (t) => {
    const user1 = await appService.signInUser({
      email: 'john@doe.com',
      password: 'password',
    })
    t.ok(user1, 'sign in if both email and password are correct')

    const user2 = await appService.signInUser({
      email: 'john@doe.co',
      password: 'password',
    })
    t.notOk(user2, 'sign in should fail if email is wrong')

    const user3 = await appService.signInUser({
      email: 'john@doe.com',
      password: 'wrong_password',
    })
    t.notOk(user3, 'sign in should fail if password is wrong')
  })
})
