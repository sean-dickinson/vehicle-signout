import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { VehicleSignout } from "app/models/vehicle-signout";
import { SimpleDialogComponent } from "../components/simple-dialog/simple-dialog.component";

@Component({
  selector: "app-signout-list",
  templateUrl: "./signout-list.component.html",
  styleUrls: ["./signout-list.component.css"],
})
export class SignoutListComponent implements OnChanges {
  @Input() signouts: VehicleSignout[];
  @Input() time: string;
  @Input() currentSignoutID: string;
  @Input() columns: string[];
  @Output() edit = new EventEmitter<VehicleSignout>();
  @Output() remove = new EventEmitter<VehicleSignout>();
  dataSource = new MatTableDataSource<VehicleSignout>();
  defaultColumns: string[] = ["reason", "timing"];
  hiddenOnMobile: string[] = ['reason', 'vehicleName']
  constructor(public bp: BreakpointObserver, public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.signouts) {
      this.dataSource.data = this.signouts;
    }
  }

  get displayedColumns(): string[] {
    let displayed: string[];
    if(this.columns && this.columns.length > 0){
      displayed = this.columns;
    } else {
      displayed = this.defaultColumns
    }

    if(this.isMobile){
      displayed = displayed.filter(c => !this.hiddenOnMobile.includes(c))
    }

    return displayed;
  }

  get isMobile(): boolean {
    return this.bp.isMatched(Breakpoints.HandsetPortrait)
  }

  get dateFormat(): string {
    return 'MMM d h:mm a'
  }

  showPurpose(signout: VehicleSignout){
    this.dialog.open(SimpleDialogComponent, {
      data: signout.reason
    })
  }
}
