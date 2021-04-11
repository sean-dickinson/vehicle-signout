import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.css']
})
export class VehicleStatusComponent implements OnInit {
  @Input() status: 'Available' | 'In Use';
  constructor() { }

  ngOnInit(): void {
  }

  get class(): string {
    return this.status === 'Available' ? 'success' : 'warn';
  }

}
