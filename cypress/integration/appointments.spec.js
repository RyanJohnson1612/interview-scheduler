
describe("Appointment", () => {
  beforeEach(() => {
    // Reset test db and visit root
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");

    // Confirm data has loaded
    cy.contains("[data-testid=day]", "Monday");
  })

  it("should book an interview", () => {
    // Click the add button
    cy.get("[alt=add]").first().click();
    
    // Add a student name
    cy.get("[data-testid=student-name-input]").type("Jim Testman")

    // Click interviewer from list
    cy.get("[alt='Sylvia Palmer']").click()

    // Click save button
    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Jim Testman");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  
  it("should edit an interview", () => {
    // Click the add button
    cy.get("[alt=Edit]").click({force: true})
    
    // Add a student name
    cy.get("[data-testid=student-name-input]").clear().type("Jim Testman")

    // Click interviewer from list
    cy.get("[alt='Tori Malcolm']").click()

    // Click save button
    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Jim Testman");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Click the add button
    cy.get("[alt=Delete]").click({force: true});

    // Click save button
    cy.contains("button", "Confirm").click();

    cy.contains("Deleting...").should('exist');
    
    cy.contains("Deleting...").should('not.exist');

    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
  });
})