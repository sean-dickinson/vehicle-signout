import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { combineDateTime } from 'app/utilities/functions';
import { Observable, of } from 'rxjs';

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const startGroup = control.get('startParentGroup');
  const endGroup = control.get('endParentGroup');

  const startDate = combineDateTime(
    startGroup.get('startDateCtrl').value,
    startGroup.get('startTimeCtrl').value
  );
  const endDate = combineDateTime(
    endGroup.get('endDateCtrl').value,
    endGroup.get('endTimeCtrl').value
  );
  if (startDate >= endDate) {
    return {
      startAfterEnd: true,
    };
  } else {
    return null;
  }
};



export class ParentErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return form.invalid;

  }
}
