const test = require('tape')

const InMemoryStore = require('../store/in-memory')
const AppService = require('../app/AppService')

const testTerms = [
  { id: 1, original: 'tag', translation: 'وسم' },
  { id: 2, original: 'attribute', translation: 'خاصية' },
]

// Terms Service Tests
test('Terms Service tests', async (t) => {
  const store = new InMemoryStore({ terms: testTerms })
  const appService = new AppService(store)

  t.test('add term', async (t) => {
    await appService.addTerm({ original: 'Bug', translation: 'خطأ' })
    t.equal(store.terms.length, 3, 'should increment terms number')
  })

  t.test('get term', async (t) => {
    const terms = await appService.listTerms()
    const testId = terms[0].id
    const term = await appService.getTerm(testId)
    t.equal(term.id, testId, 'should return the right term by ID')
  })

  t.test('update term', async (t) => {
    const terms = await appService.listTerms()
    const termToUpdate = terms[0]
    await appService.updateTerm({ ...termToUpdate, original: 'updated' })
    const updated = await appService.getTerm(termToUpdate.id)
    t.equal(updated.original, 'updated', 'should update the right term value')
  })

  t.test('delete term', async (t) => {
    await appService.deleteTerm(1)
    const deleted = await appService.getTerm(1)
    t.notOk(deleted, 'should delete a term by ID')
  })

  t.test('list terms', async (t) => {
    const terms = await appService.listTerms()
    t.ok(terms.length > 0, 'should return an array of terms')
  })

  t.test('search terms', async (t) => {
    const query = 'attribute'
    const terms = await appService.searchTerms(query)
    const isValid = terms.every(async (t) => t.original.includes(query))
    t.ok(Array.isArray(terms), 'the result should be an array')
    t.equal(terms.length, 1, 'should not be empty if given an existing query')
    t.ok(isValid, 'the returned terms should contain the query')
  })
})
