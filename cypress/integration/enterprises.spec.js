describe("enterprises", () => {
    const LOGIN_EMAIL = "test@test.test"
    const LOGIN_PASSWORD = "test"
    Cypress.Commands.add( 'multiSelect', ( selector , text) => {
        cy.get(`.ant-select${selector} > .ant-select-selector`).click();
        cy.get(`.ant-select${selector} .ant-select-selection-search input`).clear()
        cy.get(`.ant-select${selector} .ant-select-selection-search input`).invoke('attr', 'id').then((selElm) => {
          const dropDownSelector = `#${selElm}_list`;
          cy.get(`.ant-select${selector} .ant-select-selection-search input`).type(`${text}`);
          cy.get(dropDownSelector).next().find('.ant-select-item-option-content').click()
        })
      })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('qid')
    });
    after(() => {

        cy.clearCookie("qid")

    });

    it("login", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("#login_email").type(LOGIN_EMAIL);
        cy.get("#login_password").type(LOGIN_PASSWORD);
        cy.get("[type=submit]").click();
        cy.url().should("include", "/dashboard");
    });

    it("create enterprise", () => {
        cy.get("[data-cy=menu-item-enterprises]").click();
        cy.get(".anticon-plus").click();
        cy.get("#create-client_name").type("Romik Pepik");
        cy.get("#create-client_unifiedVatNumber").type("666");
        cy.get("#create-client_country").type("Huhuland");
        cy.get("#create-client_email").type(LOGIN_EMAIL);
        cy.get("#create-client_street").type("Huhuva 33");
        cy.get("#create-client_city").type("Huhuaov");
        cy.get("#create-client_postcode").type("123");
        cy.get("[data-cy=establishment-select-currency]").click();
        cy.contains(".ant-select-item-option-content", "CZK").click();
        cy.get("#create-client_mobilePhone").type("727 727 727");
        cy.contains("[type=submit]").click();


        




    })


});
