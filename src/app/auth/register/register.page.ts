import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  onRegister() {
    let token;
    this.authService.token.subscribe((res) => {
      token = res;
    });
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(resData => {
      console.log('Registracija uspešna');
      this.authService.updateUser(this.registerForm.value, token).subscribe(res => {
      });
      this.router.navigateByUrl('/log-in');
    });
  }
}
