import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.login(
      this.emailControl.value,
      this.passwordControl.value,
    ).then((userCred) => {
      this.router.navigate(['']);
    }).catch(err => this.handleErr(err));
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  handleErr(err): void {
    const code = err.code;
    switch (code) {
      case 'auth/invalid-email':
        this.loginForm.get('email').setErrors({email: true});
        break;
      case 'auth/user-disabled':
        this.loginForm.get('email').setErrors({userDisabled: true});
        break;
      case 'auth/user-not-found':
        this.loginForm.get('email').setErrors({userNotFound: true});
        break;
      case 'auth/wrong-password':
        this.loginForm.get('password').setErrors({invalidPassword: true});
        break;
    }
  }

  getErrorMessage(errors: ValidationErrors) {
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'email':
          return 'Invalid Email';
        case 'userDisabled':
          return 'User account disabled';
        case 'userNotFound':
          return 'User not found';
        case 'invalidPassword':
          return 'Invalid password';
        case 'required':
          return 'This field is required'
      }
    }
  }

}
