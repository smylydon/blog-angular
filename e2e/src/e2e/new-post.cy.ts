import {
  getFormLabel,
  getInput,
  getNavMenu,
  getSaveButton,
  getSelect,
  getTextArea,
} from '../support/app.po';

describe('blog:new-post', () => {
  const checkFormItemsAreEmpty = () => {
    getInput().should('have.value', '');
    getTextArea().should('have.value', '');
    getSaveButton().should('be.disabled');
    getSelect().should('have.value', null);
  };

  beforeEach(() => cy.visit('/post'));

  it('should display Redux Blog', () => {
    cy.url().should('eq', 'http://localhost:4200/post');
    cy.get('h1').contains('Redux Blog');
  });

  it('should display Home and Post links', () => {
    getNavMenu().children().should('have.length', 2);
    getNavMenu().children().first().contains('Home');
    getNavMenu().children().next().contains('Post');
  });

  it('should display empty form and submit is disabled', () => {
    cy.get('h2').contains('Add a New Post');
    getFormLabel().eq(0).contains('Post Title:');
    getFormLabel().eq(1).contains('Author:');
    getFormLabel().eq(2).contains('Content:');
    checkFormItemsAreEmpty();
  });

  it('should possible to type in input.', () => {
    checkFormItemsAreEmpty();
    getInput().type('a');
    getSaveButton().should('be.disabled');
    getInput().type('a');
    getSaveButton().should('be.disabled');
    getInput().type('a');
    getSaveButton().should('be.disabled');
  });

  it('should possible to type in textarea.', () => {
    checkFormItemsAreEmpty();
    getTextArea().type('a');
    getSaveButton().should('be.disabled');
    getTextArea().type('a');
    getSaveButton().should('be.disabled');
    getTextArea().type('a');
    getSaveButton().should('be.disabled');
  });

  it('should possible to select author.', () => {
    checkFormItemsAreEmpty();
    getSelect().select(1);
    getSaveButton().should('be.disabled');
    getSelect().should('have.value', '1');
    getSelect().select(10);
    getSelect().should('have.value', '10');
    getSaveButton().should('be.disabled');
  });

  it('should possible to submit a valid form.', () => {
    checkFormItemsAreEmpty();
    getInput().type('aaa');
    getTextArea().type('bbbaaacccf');
    getSelect().select(1);
    getSaveButton().should('not.be.disabled');
    getSaveButton().click();
    cy.url().should('eq', 'http://localhost:4200/post');
    checkFormItemsAreEmpty();
  });
});
