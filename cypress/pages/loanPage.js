class loanPage {

    getLoanAmountLabel() {
      return cy.get('[class=bb-edit-amount__title]');
    }

    getLoanAmountValue() {
      return cy.get('[class=bb-edit-amount__amount]');
    }

    getLanguageChangeDropdown() {
        return cy.get('[class=bb-navbar__languages]')
    }

    getModalWindowLink() {
        return cy.get('*[class^=bb-edit-amount__content]')
    }
}

export default loanPage;
