
import { FormBuilder } from "@angular/forms";
import { signoutData } from "testing-helpers/testing-data/test-signout-data";
import { testVehicles } from "testing-helpers/testing-data/test-vehicle-data";

import { EditSignoutStepperComponent } from "./edit-signout-stepper.component";
import {
  byTextContent,
  createComponentFactory,
  Spectator,
} from "@ngneat/spectator";
import { MockModule } from "ng-mocks";

import { SignoutDataService } from "app/signout-data.service";

import { SharedModule } from "app/shared/shared.module";

fdescribe("EditSignoutStepperComponent", () => {
  let spectator: Spectator<EditSignoutStepperComponent>;
  const createComponent = createComponentFactory({
    component: EditSignoutStepperComponent,
    imports: [MockModule(SharedModule)],
    providers: [FormBuilder],
    mocks: [SignoutDataService],
  });
  beforeEach(() => (spectator = createComponent()));

  it("should render the supplied vehicles", () => {
    spectator.setInput({
      vehicles: testVehicles,
      signout: signoutData[0],
    });
    expect(
      spectator.queryAll(
        byTextContent(testVehicles.join(","), {
          selector: "mat-select mat-option",
        })
      )
    ).toBeTruthy();
  });

  it("should select the vehicle supplied in the signout input", () => {
    spectator.setInput({
      vehicles: testVehicles,
      signout: signoutData[0],
    });
    const selectedVehicle = spectator.component.generalStepGroup.get(
      "vehicleCtrl"
    ).value;
    expect(selectedVehicle.uid).toEqual(signoutData[0].vehicleID);
  });
});
