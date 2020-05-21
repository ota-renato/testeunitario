import { browser, element, by } from 'protractor';
import { Locator } from 'protractor/built/locators';

describe('Testes E2E', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('deve conter no logo a palavra "Kazale"', () => {
    expect(element(<Locator>by.css('nav')).getText()).toContain('Kazale');
  });

});
