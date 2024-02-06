import {
  getFormLabel,
  getInput,
  getNavMenu,
  getSaveButton,
  getSelect,
  getTextArea,
  getDeleteButton,
} from '../support/app.po';

describe('blog:edit-post', () => {
  const checkFormItemsAreNotEmpty = () => {
    getInput().should(($p) => {
      expect($p).not.to.have.length(0);
      //expect($p.length).to.be.greaterThan(3);
    });
    getTextArea().should(($p) => {
      expect($p).not.to.have.length(0);
      //expect($p.length).to.be.greaterThan(3);
    });
    getSaveButton().should('not.be.disabled');
    getDeleteButton().should('not.be.disabled');
    getSelect().should('not.have.value', null);
  };

  beforeEach(() => cy.visit('/edit/1'));

  it('should display Redux Blog', () => {
    cy.url().should('eq', 'http://localhost:4200/edit/1');
    cy.get('h1').contains('Redux Blog');
  });

  it('should display Home and Post links', () => {
    getNavMenu().children().should('have.length', 2);
    getNavMenu().children().first().contains('Home');
    getNavMenu().children().next().contains('Post');
  });

  it('should not display an empty form and submit and delete are enabled', () => {
    cy.get('h2').contains('Edit Post');
    getFormLabel().eq(0).contains('Post Title:');
    getFormLabel().eq(1).contains('Author:');
    getFormLabel().eq(2).contains('Content:');
    checkFormItemsAreNotEmpty();
  });

  xit('should possible to submit a valid form.', () => {
    checkFormItemsAreNotEmpty();
    getInput().type('aaa');
    getTextArea().type('bbbaaacccf');
    getSelect().select(1);
    getSaveButton().should('not.be.disabled');
    getSaveButton().click();
    cy.url().should('eq', 'http://localhost:4200/');
    checkFormItemsAreNotEmpty();
  });
});
