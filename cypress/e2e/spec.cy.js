describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture:"../fixtures/example"
    }).as("getOrders")
  })

  it("On the landing page, im greeted with a title and some orders", () => {
    cy.wait('@getOrders')
    cy.get('h1').should('contain', 'Burrito Builder')

    cy.get('section .order').first()
    .should('contain', 'beans')
    .should('contain', 'lettuce')
    .should('contain', 'carnitas')
    .should('contain', 'queso fresco')
    .should('contain', 'jalapeno')

    cy.get('section .order').last()
    .should('contain', 'sofritas')
    .should('contain', 'beans')
    .should('contain', 'sour cream')
    .should('contain', 'carnitas')
    .should('contain', 'queso fresco')
  });

  it("Should add an order to the page when user submits a new order", () => {
    cy.wait('@getOrders')
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
    })
    
    cy.get("input[name=name]").type('Pippa')
    cy.get("button[name=steak]").click()
    cy.get("button[name=lettuce]").click()
    cy.get("button[name='queso fresco']").click()
    cy.get("button[name='hot sauce']").click()
    cy.get("button[name='submit order']").click()

    cy.get('section .order').last()
    .should('contain', 'steak')
    .should('contain', 'lettuce')
    .should('contain', 'queso fresco')
    .should('contain', 'hot sauce')
  })

  it("Should only add an order if both name field and ingredients are populated", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
    })
    cy.get("input[name=name]").type('Pippa')
    cy.get("button[name='submit order']").click()

    cy.get('section .order').last()
    .should('contain', 'sofritas')
    .should('contain', 'beans')
    .should('contain', 'sour cream')
    .should('contain', 'carnitas')
    .should('contain', 'queso fresco')

    cy.get("button[name=steak]").click()
    cy.get("button[name=lettuce]").click()
    cy.get("button[name='submit order']").click()

    cy.get('section .order').last()
    .should('contain', 'sofritas')
    .should('contain', 'beans')
    .should('contain', 'sour cream')
    .should('contain', 'carnitas')
    .should('contain', 'queso fresco')
  })
});
