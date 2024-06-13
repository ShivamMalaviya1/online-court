import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/services/jwt.service';

@Component({
  selector: 'app-profile-modification-screen',
  templateUrl: './profile-modification-screen.component.html',
  styleUrls: ['./profile-modification-screen.component.scss']
})
export class ProfileModificationScreenComponent implements OnInit {
  userDetail: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
   
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private token: JwtService,

  ) { 
   
  }

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
  users: any;

  ngOnInit() {
    this.userDetail = this.token.decodeJwtToken();
    console.log(this.userDetail)
    this.registerFormStep1 = this.formBuilder.group({
      id:"",
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
      city: [null, Validators.required],
      address: ["", Validators.required],
      email: [
        { value: "", disabled: false },
       [Validators.required, Validators.email]],
      mobileNumber: [
        { value: "", disabled: true },
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      category: [null, Validators.required],
      profession: ["", Validators.required],
      username:["", Validators.required],
      
    });

    let userData = localStorage.getItem("user");
    if (userData) {
      this.users = JSON.parse(userData);
      this.registerFormStep1.patchValue(this.users);
    }

    this.categoryOptions = [
      { label: "Select Category", value: null },
      { label: "Advocate", value: "ADVOCATE" },
      { label: "User", value: "USER" },
      { label: "Office Professional", value: "OFFICE" },
     
    ];

    this.commonService.getEcourtStates().subscribe(res=>{
      debugger
    })
  }

  onSubmitStep1() {
    this.submitted = true;
    
    const userId = this.registerFormStep1.get("id").value;
    console.log(userId);
  
    this.commonService.updateProfile(userId, this.registerFormStep1.value)
      .subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.status === 200) {
            this.toast.success("Profile updated");
              localStorage.removeItem('token');
              this.router.navigate(["/"])
          console.log(this.userDetail.sub)
          
            localStorage.setItem("user", JSON.stringify(this.registerFormStep1.value));
          }
        },
        error: (error: any) => {
          if (error.status === 409) {
            this.toast.warning("Duplicate Email or username");

          } else {
            this.toast.warning("Profile update failed");
            console.log(error);
            this.toast.error(error.message);
          }
        },
        complete: () => {
          this.submitted = false;
          this.currentStep = 1;
        }
      });
  }
  
  
}
