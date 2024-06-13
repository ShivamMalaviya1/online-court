// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// import { AuthService } from '../../../services/auth.service';
// import { CommonService } from '../../../services/common.service';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.scss']
// })
// export class ForgotPasswordComponent implements OnInit {
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private commonService: CommonService,
//     private authService: AuthService,

//     private fb: FormBuilder) { }

//   ngOnInit() {
//     this.initForm();
//   }
//   resetPasswordSendForm: any
//   submitted = false;
//   sendOtp= false;
//   isVerified= false

//   userID:any;
//   private initForm() {
//     this.resetPasswordSendForm = this.fb.group({
//       mobileNumber: ["+91", [
//         Validators.required,
//         Validators.pattern(/^\+91[0-9]{10}$/),
//     ]],
//     otp:["",Validators.required]

//     });
//   }

//   sendVerificationOtp() {
//     this.submitted = true;
//       this.authService.forgotPassword(this.resetPasswordSendForm.value).subscribe(
//         (res) => {
//           if (res.status ===200){
//             this.sendOtp=true
//             console.log(res)
//             console.log(res.userId)

//           }
//         },
//         (error) => {
//           console.error(error);

//         }
//       );

//   }
//   verifyOtp(){
//     if(this.resetPasswordSendForm.valid){
//       this.authService.verifyForgotPasswordOtp(this.resetPasswordSendForm.value).subscribe((res)=>{
//         if (res.status===200){
//           this.isVerified=true
//           console.log(res)
//           this.userID=res.userID
//           localStorage.setItem("id", JSON.stringify(res.userId))
//           console.log('otpVeriied');
//         }
//         if (res.status==400){
//           console.log('inavlid otp');
//         }
//       })
//     }
//   }
//   navigateToReset(){
//     if (this.isVerified){

//       this.router.navigate(["/reset-password"])
//     }
//   }

// }

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CommonService } from "../../../services/common.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  resetPasswordSendForm: any;
  submitted = false;
  sendOtp = false;
  isVerified = false;
  userID: any;

  private initForm() {
    this.resetPasswordSendForm = this.fb.group({
      mobileNumber: [
        "+91",
        [Validators.required, Validators.pattern(/^\+91[0-9]{10}$/)],
      ],
      otp: ["", Validators.required],
    });
  }
  sendOtpDisabled: boolean = false;
  remainingTime: number = 30; // Initial time in seconds

  sendVerificationOtp() {
    this.submitted = true;
    this.sendOtpDisabled = true; // Disable the button
    this.remainingTime = 30; // Reset remaining time

    const timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(timer);
        this.sendOtpDisabled = false; // Enable the button when time is up
      }
    }, 1000); // Update every second

    this.authService.forgotPassword(this.resetPasswordSendForm.value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.sendOtp = true;
          console.log(res);
          console.log(res.userId);
          this.toastr.success("OTP sent successfully!");
          this.resetPasswordSendForm.get('otp').reset()
          this.submitted=false
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error("Error sending OTP.");
        clearInterval(timer); // Stop the timer in case of error
        this.sendOtpDisabled = false; // Enable the button
      }
    );
  }

  verifyOtp() {
    if (this.resetPasswordSendForm.valid) {
      this.submitted=true;
      this.authService
        .verifyForgotPasswordOtp(this.resetPasswordSendForm.value)
        .subscribe((res) => {
          if (res.status === 200) {
            this.isVerified = true;
            console.log(res);
            this.userID = res.userID;
            localStorage.setItem("id", JSON.stringify(res.userId));
            this.toastr.success("OTP verification successful!");
            if (this.isVerified) {
              this.router.navigate(["/reset-password"]);
            }
          }
          if (res.status == 400) {
            console.log("Invalid OTP");
            this.toastr.error("Invalid OTP. Please try again.");
          }
        });
    }
  }

  navigateToReset() {
    // if (this.isVerified) {
    //   this.router.navigate(["/reset-password"]);
    // }
  }
}
