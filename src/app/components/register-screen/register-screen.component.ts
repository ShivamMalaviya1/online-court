import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

import { CommonService } from "../../../services/common.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { JwtService } from "../../../services/jwt.service";

@Component({
  selector: "app-register-screen",
  templateUrl: "./register-screen.component.html",
  styleUrls: ["./register-screen.component.scss"],
})
export class RegisterScreenComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private token: JwtService,
  ) { }

  registerFormStep1: any;
  registerFormStep2: any;
  registerFormStep3: any;
  submitted = false;
  categoryOptions: any[] | undefined;
  stateOptions = [
    { label: "Select State", value: null },
    { label: "State 1", value: "state1" },
    { label: "State 2", value: "state2" },
    { label: "State 3", value: "state3" },
  ];

  districtOptions = [
    { label: "Select District", value: null },
    { label: "District 1A", value: "district1A" },
    { label: "District 1B", value: "district1B" },
    { label: "District 2A", value: "district2A" },
    { label: "District 2B", value: "district2B" },
  ];

  cityOptions = [
    { label: "Select City", value: null },
    { label: "City 1A", value: "city1A" },
    { label: "City 1B", value: "city1B" },
    { label: "City 2A", value: "city2A" },
    { label: "City 2B", value: "city2B" },
  ];

  currentStep = 0;

  steps = [
    { label: "Personal Details", command: () => this.onStepChange(0) },
    { label: "Verification", command: () => this.onStepChange(1) },
    { label: "Create Credentials", command: () => this.onStepChange(2) },
  ];

  ngOnInit() {
    this.registerFormStep1 = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      city: [null, Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["+91", [
        Validators.required,
        Validators.pattern(/^\+91[0-9]{10}$/),
    ]],
    
      category: [null, Validators.required],
      profession: ["", Validators.required],
      username: " ",
      password:" ",
      roles:"USER"
    });

   

    this.registerFormStep2 = this.formBuilder.group({
      mobileNumber: ["+91", [
        Validators.required,
        Validators.pattern(/^\+91[0-9]{10}$/),
    ]],

      otp: ["", Validators.required],
    });

    this.registerFormStep3 = this.formBuilder.group({
      userID:[""],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.categoryOptions = [
      { label: "Select Category", value: null },
      { label: "Advocate", value: "ADVOCATE" },
      { label: "User", value: "USER" },
      { label: "Office Professional", value: "OFFICE" },
     
    ];
  }
  otpsend= false;
  otpVerified= false
  userId=null;

  onStepChange(step: any) {
    this.currentStep = step;
  }
  onSubmitStep1() {
    this.submitted = true;
    try {
        if (this.registerFormStep1.valid) {
            this.authService.registration(this.registerFormStep1.value).subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.status === 201) {
                        this.userId = response.user.id;
                        this.currentStep = 1;
                        this.submitted = false;
                        this.toast.success("Please verify number");
                    }
                },
                (error: any) => {
                  
                 
                    let step = error?.nextStep;
                    let msg = error.error
                    let userId = error.userId;

                    this.currentStep = step - 1;
                    this.toast.success(`${msg}  ${this.currentStep}`);
                    this.userId=userId;
                    console.log("user id ", userId)
                            
                        
                    
                }
            );
        }
    } catch (error) {
        console.log(error);
        alert();
    }
}

  generateOtp(){
    this.authService.generateOtp(this.registerFormStep2.value).subscribe((res:any)=>{
      if (res.otp){
        this.otpsend=true
      }
    })
  }
  verifyOtp(){
    this.submitted = true;
    if (this.registerFormStep2) {
      this.authService.verifyRegistration(this.registerFormStep2.value).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
           this.otpVerified=true
            this.submitted = false;
            this.toast.success("Create Credentials");
          } else {
            this.toast.error("Failed to verify OTP. Please try again.");
          }
        },
        (error) => {
          console.error(error);
          if (error.status === 400) {
            this.toast.error("Invalid OTP. Please enter a valid OTP.");
          } else if (error.status === 500) {
            this.toast.error("Failed to verify OTP. Server error. Please try again later.");
          } else {
            this.toast.error("An unexpected error occurred. Please try again.");
          }
        }
      );
      this.submitted = false;
    }
  }
  onSubmitStep2() {
    if (this.otpVerified){
      this.currentStep = 2;
    }
  }
  

  onSubmitStep3() {
    try {
        if (this.registerFormStep3.valid) {
            // Patch the userId to the form
            this.registerFormStep3.patchValue({
                userID: this.userId,
            });
            this.authService.createCredentials(this.registerFormStep3.value).subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.currentStep = 2;
                        this.submitted = false;
                        this.toast.success(response.message);
                        this.router.navigate(["/login"]);
                    }
                },
                (error: any) => {
                    console.error(error);
                    this.handleRegistrationError(error);
                }
            );
        }
    } catch (error: any) {
        console.log(error);
        this.toast.error(error.message);
    }
}
private handleRegistrationError(error: any) {
    if (error.status === "BAD_GATEWAY" && error.exceptionType === "DuplicateEmailException") {
        this.toast.error("User already exists with this username");
       
    } else {
        this.toast.error("An error occurred. Please try again later.");
       
    }
}

}
