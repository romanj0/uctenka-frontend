describe("uctenka register", () => {
    const REGISTER_EMAIL = "romikpepik@seznam.cz"
    const REGITER_FIRSTNAME = "romik"
    const REGISTER_LASTNAME = "pepik"
    const REGISTER_PASSWORD = "romikpepik"

    it("register a login", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("[title=Register]").click();
        cy.get("#register_email").type(REGISTER_EMAIL);
        cy.get("#register_firstName").type(REGITER_FIRSTNAME);
        cy.get("#register_lastName").type(REGISTER_LASTNAME);
        cy.get("#register_password").type(REGISTER_PASSWORD);
        cy.get("[type=submit]").click();
        cy.get("#register_firstName").should("not.exist");

        cy.get("#login_email").type(REGISTER_EMAIL);
        cy.get("#login_password").type(REGISTER_PASSWORD);
        cy.get("[type=submit]").click();
        cy.url().should("include", "/dashboard");


        



    });





});