import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'app/models/vehicle';
import { compareUID } from 'app/utilities/functions';

@Component({
  selector: 'add-signout-stepper',
  templateUrl: './add-signout-stepper.component.html',
  styleUrls: ['./add-signout-stepper.component.css']
})
export class AddSignoutStepperComponent implements OnInit {
  generalStepGroup: FormGroup;
  timeStepGroup: FormGroup;
  today: Date;
  @Input() vehicles: Vehicle[];
  @Input() currentVehicle: Vehicle;
  compareFn = compareUID;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // TODO: Implement Validation
    this.today = new Date();
    const suggestedEnd = new Date(this.today.getTime() + 60 * 60 * 1000);

    this.generalStepGroup = this.fb.group({
      vehicleCtrl: [this.currentVehicle, Validators.required],
      reasonCtrl: ['']
    });
    this.timeStepGroup = this.fb.group({
      startParentGroup: this.fb.group({
        startDateCtrl: [new Date(this.today), Validators.required],
        startTimeCtrl: [formatDate(this.today, 'HH:MM', 'en'), Validators.required]
      }),
      endParentGroup: this.fb.group({
        endDateCtrl: [suggestedEnd, Validators.required],
        endTimeCtrl: [formatDate(suggestedEnd, 'HH:MM', 'en'), Validators.required]
      })
    })
  }

}
