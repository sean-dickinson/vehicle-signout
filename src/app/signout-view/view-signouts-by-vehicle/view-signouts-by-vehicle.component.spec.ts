import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { SignoutDataService } from "app/signout-data.service";
import { TimeService } from "app/time.service";
import { VehicleService } from "app/vehicle.service";
import { of } from "rxjs";

import { ActivatedRouteStub } from "testing-helpers/activated-route-stub";
import { signoutData } from "testing-helpers/test-signout-data";
import { testVehicles } from "testing-helpers/test-vehicle-data";
import timeServiceStub from "testing-helpers/time-service-stub";
import { ViewSignoutsByVehicleComponent } from "./view-signouts-by-vehicle.component";

describe("ViewSignoutsByVehicleComponent", () => {
  let component: ViewSignoutsByVehicleComponent;
  let fixture: ComponentFixture<ViewSignoutsByVehicleComponent>;

  const signoutDataService = jasmine.createSpyObj("SignoutDataService", [
    "getSignoutsByVehicle",
    "getLastSignout",
  ]);
  const getSignoutsSpy = signoutDataService.getSignoutsByVehicle.and.returnValue(
    of(signoutData)
  );

  const vehicleService = jasmine.createSpyObj("VehicleService", [
    "getVehicleByID",
  ]);
  const getVehicleSpy = vehicleService.getVehicleByID.and.returnValue(
    of(testVehicles[0])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSignoutsByVehicleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({
            vehicleID: "1234",
          }),
        },
        {
          provide: SignoutDataService,
          useValue: signoutDataService,
        },
        {
          provide: VehicleService,
          useValue: vehicleService,
        },

        {
          provide: TimeService,
          useValue: timeServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignoutsByVehicleComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
