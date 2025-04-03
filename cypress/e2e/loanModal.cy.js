import modalWindowPage from '../pages/modalWindowPage.js';
import loanPage from '../pages/loanPage.js';
import texts from '../fixtures/texts.json';
import testData from '../fixtures/testData.json';

describe('BIGBANK loan modal window tests for page elements', () => {

    const modalPage = new modalWindowPage();
    const basePage = new loanPage();
    let languages= [];

    languages = [
        {
            language: "ET",
            modalHeader: texts.ET.modalHeader,
            loanAmount: texts.ET.loanAmount,
            months: texts.ET.months,
            monthlyPayment: texts.ET.monthlyPayment,
            continue: texts.ET.continue,
            loanAmount: texts.ET.loanAmount
        },
        {
            language: "RU",
            modalHeader: texts.RU.modalHeader,
            loanAmount: texts.RU.loanAmount,
            months: texts.RU.months,
            monthlyPayment: texts.RU.monthlyPayment,
            continue: texts.RU.continue,
            loanAmount: texts.RU.loanAmount
        }
    ]
    languages.forEach((languages) => {
        it('Check element existences in modal window and in base view related to values given in modal for ' + languages.language, () => {
            cy.visit(Cypress.config('baseUrl'));
            modalPage.getCloseIcon().should('be.visible').click();
            basePage.getLanguageChangeDropdown().should('be.visible').click();
            basePage.getLanguageChangeDropdown().contains(languages.language).click();
            basePage.getModalWindowLink().should('be.visible').click()
            //Check if all elements on page exist
            modalPage.getPageTitleLabel().should('be.visible').contains(languages.modalHeader);
            modalPage.getLoanAmountArea().should('be.visible').contains(languages.loanAmount);
            modalPage.getLoanAmountInput().should('be.visible');
            modalPage.getLoanAmountSlider().should('be.visible');
            modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuemin').and('equal', testData.amountMin);
            modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuemax').and('equal', testData.amountMax);
            modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.defaultAmount);
            modalPage.getPeriodAmountInput().should('be.visible');
            modalPage.getPeriodAmountInputMonthsLabel().should('be.visible').contains(languages.months)
            modalPage.getPeriodAmountSlider().should('be.visible');
            modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuemin').and('equal', testData.periodMin);
            modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuemax').and('equal', testData.periodMax);
            modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.defaultPeriod);
            modalPage.getMonthlyPaymentResultLabel().should('be.visible').contains(languages.monthlyPayment);
            modalPage.getMonthlyPaymentResultAmount().should('be.visible').contains(testData.defaultMonthlyPayment);
            modalPage.getContinueButton().should('be.visible').contains(languages.continue).click();
            basePage.getLoanAmountLabel().should('be.visible').contains(languages.loanAmount);
            basePage.getLoanAmountValue().should('be.visible').contains(testData.defaultAmount);
        })
    })

    it('Check if changing the loan amount is reflected correctly in the elements', () => {
        cy.visit(Cypress.config('baseUrl'));
        //Check if all elements on page exist
        modalPage.getPageTitleLabel().should('be.visible').contains(texts.ET.modalHeader);
        modalPage.getLoanAmountInput().should('be.visible').clear().type(testData.forTesting.desiredAmount);
        //Using modal window to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getLoanAmountSlider().should('be.visible');
        modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.forTesting.desiredAmount);
        modalPage.getMonthlyPaymentResultAmount().should('be.visible').contains(testData.forTesting.expectedMonthlyPaymentForAmount);
        modalPage.getContinueButton().should('be.visible').click();
        basePage.getLoanAmountValue().should('be.visible').contains(testData.forTesting.desiredAmount);
    })

    it('Check if changing the loan duration is reflected correctly in the elements', () => {
        cy.visit(Cypress.config('baseUrl'));
        //Check if all elements on page exist
        modalPage.getPageTitleLabel().should('be.visible').contains(texts.ET.modalHeader);
        modalPage.getPeriodAmountInput().should('be.visible').clear().type(testData.forTesting.desiredMonths);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getPeriodAmountSlider().should('be.visible');
        modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.forTesting.desiredMonths);
        modalPage.getMonthlyPaymentResultAmount().should('be.visible').contains(testData.forTesting.expectedMonthlyPaymentForMonths);
        modalPage.getContinueButton().should('be.visible').click();
        basePage.getLoanAmountValue().should('be.visible').contains(testData.defaultAmount);
    })

    it('Check if changing the loan amount to value outside of allowed range defaults them to the closet allowed value', () => {
        cy.visit(Cypress.config('baseUrl'));
        //Check if all elements on page exist
        modalPage.getPageTitleLabel().should('be.visible').contains(texts.ET.modalHeader);
        modalPage.getLoanAmountInput().should('be.visible').clear().type(testData.forTesting.tooLittleAmount);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getLoanAmountSlider().should('be.visible');
        modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.amountMin);
        modalPage.getLoanAmountInput().should('be.visible').clear().type(testData.forTesting.tooMuchAmount);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getLoanAmountSlider().should('be.visible');
        modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.amountMax);

    })

    it('Check if changing the loan duration to value outside of allowed range defaults them to the closet allowed value', () => {
        cy.visit(Cypress.config('baseUrl'));
        //Check if all elements on page exist
        modalPage.getPageTitleLabel().should('be.visible').contains(texts.ET.modalHeader);
        modalPage.getPeriodAmountInput().should('be.visible').clear().type(testData.forTesting.tooLittleMonths);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getPeriodAmountSlider().should('be.visible');
        modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.periodMin);
        modalPage.getPeriodAmountInput().should('be.visible').clear().type(testData.forTesting.tooManyMonths);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getPeriodAmountSlider().should('be.visible');
        modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.periodMax);
    })

    it('Check if input field allow letters to be inserted', () => {
        cy.visit(Cypress.config('baseUrl'));
        //Check if all elements on page exist
        modalPage.getPageTitleLabel().should('be.visible').contains(texts.ET.modalHeader);
        modalPage.getLoanAmountInput().should('be.visible').clear().type(testData.forTesting.lettersToBeInserted);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getLoanAmountSlider().should('be.visible');
        modalPage.getLoanAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.amountMin);
        modalPage.getPeriodAmountInput().should('be.visible').clear().type(testData.forTesting.lettersToBeInserted);
        //Using modal window header to click on for sliders to update and not leave the window
        modalPage.getPageTitleLabel().click()
        modalPage.getPeriodAmountSlider().should('be.visible');
        modalPage.getPeriodAmountSliderDot().should('be.visible').should('have.attr', 'aria-valuetext').and('equal', testData.periodMin);
    })

})