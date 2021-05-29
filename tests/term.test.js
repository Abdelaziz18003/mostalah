const { test } = require('zora')
const Store = require('./store')
const TermEntity = require('../domain/term/TermEntity')
const TermRepository = require('../domain/term/TermRepository')
const TermService = require('../domain/term/TermService')

const testTerms = [
  { id: 1, value: 'tag' },
  { id: 2, value: 'attribute' },
]

const store = new Store({ terms: testTerms })
const repository = new TermRepository(store)
const termService = new TermService(repository)

test('Terms Service tests', (t) => {
  t.test('add term', (t) => {
    const term = new TermEntity({ id: 3, value: 'Bug' })
    termService.addTerm(term)
    t.equal(store.terms.length, 3, 'should increment terms number')
  })

  t.test('get term', (t) => {
    const term = termService.getTerm(1)
    t.equal(term.id, 1, 'should return the right term by ID')
  })

  t.test('update term', (t) => {
    const newTerm = new TermEntity({ id: 1, value: 'Bug updated' })
    termService.updateTerm(newTerm)
    const updated = termService.getTerm(1)
    t.equal(updated.value, 'Bug updated', 'should update the right term value')
  })

  t.test('delete term', (t) => {
    termService.deleteTerm(1)
    const deleted = termService.getTerm(1)
    t.notOk(deleted, 'should delete a term by ID')
  })

  t.test('list terms', (t) => {
    const terms = termService.listTerms()
    t.ok(terms.length > 0, 'should return an array of terms')
  })
})
