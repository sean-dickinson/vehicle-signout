import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatNavList } from "@angular/material/list";
import {
  byText,
  byTextContent,
  createComponentFactory,
  Spectator,
} from "@ngneat/spectator";
import { MockComponent } from "ng-mocks";
import { RouterLinkDirectiveStub } from "testing-helpers/router-link-stub";
import { testActiveUser } from "testing-helpers/test-user-data";
import { testVehicles } from "testing-helpers/test-vehicle-data";
import { NavListComponent } from "./nav-list.component";

fdescribe("NavListComponent", () => {
  let spectator: Spectator<NavListComponent>;
  const createComponent = createComponentFactory({
    component: NavListComponent,
    declarations: [
      MockComponent(MatNavList),
      MockComponent(MatDivider),
      MockComponent(MatIcon),
      RouterLinkDirectiveStub,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it("should render the router links correctly", () => {
    spectator.setInput({
      vehicles: testVehicles,
    });
    const routerLinks = spectator.queryAll(RouterLinkDirectiveStub);
    expect(routerLinks.length).toBe(testVehicles.length + 1);
    expect(routerLinks[0].linkParams).toEqual(["/vehicle", testVehicles[0].uid]);
  });

  it("should render the vehicles", () => {
    spectator.setInput({
      vehicles: testVehicles,
    });
    expect(
      spectator.query(byText(testVehicles[0].icon, { selector: "mat-icon" }))
    ).toBeTruthy();
    expect(
      spectator.query(
        byTextContent(testVehicles[0].name, { selector: "a span" })
      )
    ).toBeTruthy();
  });

  it("should not render the admin link if the user is not an admin", () => {
    spectator.setInput({
      user: testActiveUser,
    });
    expect(
      spectator.query(byText("admin", { selector: "a mat-icon" }))
    ).toBeNull();
  });

  it("should render the admin link if the user is an admin", () => {
    spectator.setInput({
      user: {
        ...testActiveUser,
        isAdmin: true,
      },
    });
    expect(
      spectator.query(byText("admin", { selector: "a mat-icon" }))
    ).toBeTruthy();
  });
});
