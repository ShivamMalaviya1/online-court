import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtService } from '../../../services/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private token: JwtService) { }
  ngOnInit() {
    if (this.token.isAuthenticated()) {
      this.router.navigate(["/case-page"])
    }
    this.initForm();
  }
  loginForm: any
  submitted = false;
  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          console.log(response)
         
          const authtoken = response.token;
          // localStorage.setItem('token', token);
          this.token.setToken(authtoken)
          localStorage.setItem("user", JSON.stringify(response.user))

          
          this.toast.success("Login successful!");
          this.router.navigate(["/case-page"])

        },
        (error) => {
          // Handle login error
          this.toast.error(" Invalid credentials!");
          console.error('Login failed:', error.error.error);
        }
      );
    }
  }
}
