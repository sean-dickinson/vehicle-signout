import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { SignoutListComponent } from "app/shared/signout-list/signout-list.component";
import { MockComponent } from "ng-mocks";
import { signoutData } from "testing-helpers/testing-data/test-signout-data";
import { testActiveUser } from "testing-helpers/testing-data/test-user-data";

import { ManageSignoutsCardComponent } from "./manage-signouts-card.component";

describe("ManageSignoutsCardComponent", () => {
  let spectator: Spectator<ManageSignoutsCardComponent>;
  const createComponent = createComponentFactory({
    component:ManageSignoutsCardComponent,
    declarations: [ 
      MockComponent(MatCard),
      MockComponent(MatCardContent),
      MockComponent(MatCardTitle),
      MockComponent(SignoutListComponent)
    ]
  });

  beforeEach(() => (spectator = createComponent()));

  it("should render the username and type of signout card", () => {
    spectator.setInput({
      type: "Past",
      user: testActiveUser,
    });
    const title = spectator.query("mat-card-title");
    expect(title).toHaveText(testActiveUser.displayName);
    expect(title).toHaveText("Past");
  });

  it("should render signout list when there are signouts", () => {
    spectator.setInput({
      signouts: signoutData,
      time: signoutData[0].startTime
    });

    expect(spectator.query('signout-list')).toBeTruthy()
  });

  it('should render message when no signouts are present', () => {
    expect(spectator.query('h2')).toHaveText('No Signouts')
  });

  it("should correctly output signouts for edit", () => {
    spectator.setInput({
      signouts: signoutData,
      time: signoutData[0].startTime
    });

    let output;
    spectator.output('edit').subscribe(val => {output = val});

    spectator.triggerEventHandler(SignoutListComponent, 'edit', signoutData[0]);
    expect(output).toEqual(signoutData[0]);
  });

  it("should correctly output signouts for remove", () => {
    spectator.setInput({
      signouts: signoutData,
      time: signoutData[0].startTime
    });

    let output;
    spectator.output('remove').subscribe(val => {output = val});

    spectator.triggerEventHandler(SignoutListComponent, 'remove', signoutData[0]);
    expect(output).toEqual(signoutData[0]);
  })

});
