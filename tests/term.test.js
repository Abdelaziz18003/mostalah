const test = require('tape')

const FakeStore = require('../infrastructure/store/fake')
const AppService = require('../app/AppService')

const testTerms = [
  { id: 1, value: 'tag' },
  { id: 2, value: 'attribute' },
]

// Terms Service Tests
test('Terms Service tests', async (t) => {
  const store = new FakeStore({ terms: testTerms })
  const appService = new AppService(store)

  t.test('add term', async (t) => {
    await appService.addTerm({ value: 'Bug' })
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
    await appService.updateTerm({ ...termToUpdate, value: 'updated' })
    const updated = await appService.getTerm(termToUpdate.id)
    t.equal(updated.value, 'updated', 'should update the right term value')
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
    const isValid = terms.every(async (t) => t.value.includes(query))
    t.ok(Array.isArray(terms), 'the result should be an array')
    t.equal(terms.length, 1, 'should not be empty if given an existing query')
    t.ok(isValid, 'the returned terms should contain the query')
  })
})

const testTranslations = [
  { id: 1, termId: 1, value: 'وسم' },
  { id: 2, termId: 2, value: 'خاصية' },
  { id: 3, termId: 2, value: 'سمة' },
]

// Translation Service tests
test('Translation Service tests', async (t) => {
  const store = new FakeStore({ translations: testTranslations })
  const appService = new AppService(store)

  t.test('add translation', async (t) => {
    const terms = await appService.listTerms()
    const termId = terms[0].id
    let translations = await appService.listTranslations(termId)
    const oldCount = translations.length
    await appService.addTranslation({
      termId: termId,
      value: 'ميزة',
    })
    translations = await appService.listTranslations(termId)
    t.equal(
      translations.length,
      oldCount + 1,
      'should increment translations number'
    )
  })

  t.test('get translation', async (t) => {
    const terms = await appService.listTerms()
    const translations = await appService.listTranslations(terms[0].id)
    const testId = translations[0].id
    const translation = await appService.getTranslation(testId)
    t.equal(translation.id, testId, 'should return the right translation by ID')
  })

  t.test('update translation', async (t) => {
    const terms = await appService.listTerms()
    const termId = terms[0].id
    const translations = await appService.listTranslations(termId)
    const translationId = translations[0].id
    await appService.updateTranslation({
      id: translationId,
      termId,
      value: 'updated',
    })
    const updated = await appService.getTranslation(translationId)
    t.equal(
      updated.value,
      'updated',
      'should update the right translation value'
    )
  })

  t.test('delete translation', async (t) => {
    await appService.deleteTranslation(1)
    const deleted = await appService.getTranslation(1)
    t.notOk(deleted, 'should delete a translation by ID')
  })

  t.test('list translations', async (t) => {
    try {
      await appService.listTranslations()
      t.fail('should throw an error if no termId is provided')
    } catch {
      t.pass('should throw an error if no termId is provided')
    }

    const translations = await appService.listTranslations(2)
    t.ok(
      translations.length > 0,
      'should return a translations array of a given term'
    )
  })
})
