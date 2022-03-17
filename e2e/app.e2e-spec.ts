import { DemoWebuiPage } from './app.po';

describe('kosmyna-ui App', () => {
  let page: DemoWebuiPage;

  beforeEach(() => {
    page = new DemoWebuiPage();
  });

  it('should display message saying app works', done => {
    page.navigateTo();
    page.getParagraphText()
    .then(msg => expect(msg).toEqual('app works!'))
    .then(done, done.fail);
  });
});
