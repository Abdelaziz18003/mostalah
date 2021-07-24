const test = require('tape')

const FakeStore = require('../infrastructure/store/fake')
const AppService = require('../app/AppService')

const testTerms = [
  { id: 1, value: 'tag' },
  { id: 2, value: 'attribute' },
]

let createdUserId = ''

// Users Service Tests
test('Users Service tests', async (t) => {
  const store = new FakeStore({ terms: testTerms })
  const appService = new AppService(store)

  t.test('sign up user', async (t) => {
    const createdUser = await appService.signUpUser({
      username: 'john_doe',
      email: 'john@doe.com',
      password: 'hashed_password',
    })
    createdUserId = createdUser.id
    const fetchedUser = await appService.getUser({id: createdUser.id})
    t.equal(
      createdUser.id,
      fetchedUser.id,
      'sign up should add a user to the DB'
    )

    try {
      await appService.signUpUser({
        username: 'john_doe',
        email: 'john@doe.com',
        password: 'hashed_password',
      })
      t.fail('don\'t accept two users with the same email')
    } catch {
      t.pass('don\'t accept two users with the same email')
    }

  })

  test('get user', async (t) => {
    const user1 = await appService.getUser({email: 'john@doe.com'})
    t.ok(user1.id, 'A user can be got by email')

    const user2 = await appService.getUser({id: createdUserId})
    t.ok(user2.id, 'A user can be got by id')
  })

})
