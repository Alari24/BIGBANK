class modalWindowPage {

    getCloseIcon() {
        return cy.get('*[class^=bb-modal__close]')
    }

    getPageTitleLabel() {
      return cy.get('[class=bb-calculator-modal__heading]');
    }

    getLoanAmountArea() {
        return cy.get('[id=header-calculator-amount]')
    }

    getLoanAmountInput() {
        return cy.get('[id=header-calculator-amount]').find('input')
    }

    getLoanAmountSlider() {
        return cy.get('[id=header-calculator-amount]').find('[class=vue-slider-rail]')
    }

    getLoanAmountSliderDot() {
        return cy.get('[id=header-calculator-amount]').find('*[class^=vue-slider-dot]')
    }

    getPeriodArea() {
        return cy.get('[id=header-calculator-period]')
    }

    getPeriodAmountInput() {
        return cy.get('[id=header-calculator-period]').find('input')
    }

    getPeriodAmountInputMonthsLabel() {
         return cy.get('[id=header-calculator-period]').find('[class=input-addon]')
    }

    getPeriodAmountSlider() {
        return cy.get('[id=header-calculator-period]').find('[class=vue-slider-rail]')
    }

    getPeriodAmountSliderDot() {
        return cy.get('[id=header-calculator-period]').find('*[class^=vue-slider-dot]')
    }

    getMonthlyPaymentResultLabel() {
        return cy.get('[class=bb-labeled-value__label]')
    }

    getMonthlyPaymentResultAmount() {
        return cy.get('[class=bb-labeled-value__value]')
    }

    getContinueButton() {
        return cy.get('*[class^=bb-calculator-modal__submit-button]')
    }
}

export default modalWindowPage;
