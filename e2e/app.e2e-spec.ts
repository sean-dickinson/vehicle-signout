import { VehicleSignoutPage } from './app.po';

describe('vehicle-signout App', () => {
  let page: VehicleSignoutPage;

  beforeEach(() => {
    page = new VehicleSignoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
