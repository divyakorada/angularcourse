import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss'],
})
export class FormValidatorComponent {
  userData: any;
  submit: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getUsersData();
  }

  loginForm = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      // website: new FormControl(''),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    },
    {
      validators: this.MustMatch('password', 'confirmPassword'),
    }
  );

  MustMatch(x: any, y: any): ValidatorFn {
    return (fromGroup: FormGroup): ValidationErrors | null => {
      const passwordCntrl = fromGroup.controls[x];
      const confirmPasswordCntrl = fromGroup.controls[y];

      console.log('passwordCntrl', passwordCntrl);
      console.log('confirmPasswordCntrl', confirmPasswordCntrl);

      if (!passwordCntrl || !confirmPasswordCntrl) {
        return null;
      }

      if (
        confirmPasswordCntrl.errors &&
        !confirmPasswordCntrl.errors['MustMatch']
      ) {
        return null;
      }

      if (passwordCntrl.value !== confirmPasswordCntrl.value) {
        confirmPasswordCntrl.setErrors({ MustMatch: true });
        return { mustMatch: true };
      } else {
        confirmPasswordCntrl.setErrors(null);
        return null;
      }
    };
  }

  // Another way of using FormBuilder
  // userForm = this.fb.group({
  //   id: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   userName: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phone: new FormControl('', [Validators.required]),
  // })

  getUsersData() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
  .subscribe((r) => {
        this.userData = r;
      });
    console.log('loginForm::::', this.loginForm);
  }

  onEdit(id: number) {
    this.http
      .get('https://jsonplaceholder.typicode.com/users/' + id)
      .subscribe((response) => {
        console.log('response', response['id']);
        this.loginForm = new FormGroup({
          id: new FormControl(response['id'], [Validators.required]),
          name: new FormControl(response['name'], [Validators.required]),
          userName: new FormControl(response['username'], [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(5),
          ]),
          email: new FormControl(response['email'], [
            Validators.required,
            Validators.email,
          ]),
          phone: new FormControl(response['phone'], [Validators.required]),
          password: new FormControl('', [Validators.required]),
          confirmPassword: new FormControl('', [Validators.required]),
          //   website: new FormControl(response.website)
          acceptTerms: new FormControl(false, [Validators.requiredTrue]),
        });
      });
  }

  onSubmit() {
    console.log('loginform', this.loginForm);
    const obj = this.loginForm.value;
    this.http
      .post('https://jsonplaceholder.typicode.com/users', obj)
      .subscribe((res) => {
        // alert('user Created');
      });
  }

  loginFormSumbit() {
    this.submit = true;
  }

  reset() {
    this.loginForm.reset();
  }
}
