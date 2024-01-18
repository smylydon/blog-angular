import { getNavMenu } from '../support/app.po';

describe('blog', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Redux Blog', () => {
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('h1').contains('Redux Blog');
  });

  it('should display Home and Post links', () => {
    getNavMenu().children().should('have.length', 2);
    getNavMenu().children().first().contains('Home');
    getNavMenu().children().next().contains('Post');
  });

  it('should display 100 posts', () => {
    cy.get('lib-post-list').children().should('have.length', 100);
  });

  it('should be able to navigate to Post', () => {
    getNavMenu()
      .children()
      .eq(1)
      .click()
      .url()
      .should('eq', 'http://localhost:4200/post');
  });
});
