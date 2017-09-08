import { VardasKitchenNewPage } from './app.po';

describe('vardas-kitchen-new App', () => {
  let page: VardasKitchenNewPage;

  beforeEach(() => {
    page = new VardasKitchenNewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
