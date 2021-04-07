import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { signoutData } from "testing-helpers/testing-data/test-signout-data";
import { MockComponent } from "ng-mocks";
import { VehicleSignoutCardComponent } from "./vehicle-signout-card.component";
import { MatIcon } from "@angular/material/icon";
import { LastSignoutComponent } from "./last-signout/last-signout.component";
import { MatCard, MatCardContent, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { SignoutListComponent } from "app/shared/signout-list/signout-list.component";

describe("VehicleSignoutCardComponent", () => {
  let spectator: Spectator<VehicleSignoutCardComponent>;
  const createComponent = createComponentFactory({
    component: VehicleSignoutCardComponent,
    declarations: [
      MockComponent(MatIcon),
      MockComponent(MatCard),
      MockComponent(MatCardContent),
      MockComponent(MatCardTitle),
      MockComponent(MatCardSubtitle),
      MockComponent(SignoutListComponent),
      MockComponent(LastSignoutComponent),

    ],
  });
  beforeEach(() => (spectator = createComponent()));

  it("currentSignoutID getter should work as expected", () => {
    spectator.setInput({
      signouts: signoutData,
      currentTime: signoutData[0].startTime,
    });
    expect(spectator.component.currentSignoutID).toBe(signoutData[0].uid);
  });

  it("should show an icon if it is currently out", () => {
    spectator.setInput({
      signouts: signoutData,
      currentTime: signoutData[0].startTime,
    });

    const iconElement = spectator.query("mat-icon");
    expect(iconElement.textContent).toBe("warning");
  });

  it("should show no signouts if no signouts are given", () => {
    const h2El = spectator.query("h2");
    expect(h2El.textContent).toBe("No Signouts Scheduled");
  });

  it("should show signout list if signouts are given", () => {
    spectator.setInput({ signouts: signoutData });
    expect(spectator.query("signout-list")).toBeTruthy();
  });
});
