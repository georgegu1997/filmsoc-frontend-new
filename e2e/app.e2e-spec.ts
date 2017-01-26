import { FilmsocNewFrontendPage } from './app.po';

describe('filmsoc-new-frontend App', function() {
  let page: FilmsocNewFrontendPage;

  beforeEach(() => {
    page = new FilmsocNewFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
