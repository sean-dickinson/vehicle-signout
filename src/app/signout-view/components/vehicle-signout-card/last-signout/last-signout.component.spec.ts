import {signoutData} from 'testing-helpers/testing-data/test-signout-data';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { LastSignoutComponent } from './last-signout.component';

describe('LastSignoutComponent', () => {
  let spectator: Spectator<LastSignoutComponent>;
  const createComponent = createComponentFactory(LastSignoutComponent);

  beforeEach(() => spectator = createComponent());


  it('should render nothing if no signout', () => {
    expect(spectator.query('span').textContent.trim()).toBe('');
  });

  it('should correctly render the signout', () => {
    spectator.setInput({signout: signoutData[0]});
    expect(spectator.query('span').textContent).toContain(signoutData[0].userName)
  });

});
