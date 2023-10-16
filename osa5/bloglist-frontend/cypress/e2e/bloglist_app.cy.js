describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('') //http://localhost:5173
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('väärä salasana')
      cy.get('#login-button').click()
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a blog can be created, liked and removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress hill')
      cy.get('#url').type('cypress.com')
      cy.contains('create').click()
      cy.get('#view').click()
      cy.contains('cypress blog')
      cy.contains('cypress hill')
      cy.contains('cypress.com')
      cy.get('#like').click()
      cy.contains('likes: 1')
      cy.get('#remove').click()
      cy.get('#view').should('not.exist')
    })

    it('blogit järrjetst', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress hill')
      cy.get('#url').type('cypress.com')
      cy.contains('create').click()
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('likes: 1')
      cy.get('#like').click()
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog two')
      cy.get('#author').type('cypress hill')
      cy.get('#url').type('cypress.com')
      cy.contains('create').click()
      cy.get('.blog').eq(0).should('contain', 'cypress blog')
      cy.get('.blog').eq(1).should('contain', 'cypress blog two')
    })
  })
  describe('Blog deletion', function() {
    beforeEach(function() {
      const anotherUser = {
        name: 'Arto Hellas',
        username: 'ahellas',
        password: 'salainen'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)
      cy.visit('')
    })

    it('only the  blog creator can delete the blog', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress hill')
      cy.get('#url').type('cypress.com')
      cy.contains('create').click()
      cy.get('#logout').click()
      cy.get('#username').type('ahellas')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('cypress blog').parent().contains('view').click()
      cy.get('#remove').should('not.exist')
    })
  })
})