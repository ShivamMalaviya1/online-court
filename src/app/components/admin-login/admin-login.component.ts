
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtService } from '../../../services/jwt.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})


export class AdminLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
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
      this.authService.adminLogin(this.loginForm.value).subscribe((res)=>{
        if (res.token){
          console.log("response",res)
          this.token.setToken(res.token)
          this.router.navigate(['/case-history'], { replaceUrl: true });
          console.log('Form submitted successfully!');
        }
      })
      // window.location.reload()
    }
  }
}
