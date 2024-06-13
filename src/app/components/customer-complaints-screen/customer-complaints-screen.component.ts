import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/services/jwt.service';
import { CommonService } from 'src/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-complaints-screen',
  templateUrl: './customer-complaints-screen.component.html',
  styleUrls: ['./customer-complaints-screen.component.css']
})
export class CustomerComplaintsScreenComponent {
  complains!: any[];
  selectedCustomers!: any[];
  complainForm: any
  representatives!: any[];
  loading: boolean = true;

  activityValues: number[] = [0, 100];
  displayModal: boolean = false;
  feedbackForm: any;
  openAddNumberModal(type: any) {
    this.displayModal = true;
    this.complainForm.get("type").setValue(type)
  }
  @ViewChild('addCasePanel') addCasePanel: any;
  addCaseForm: any;
  selectedStatus: any;
  userDetail: any;
  constructor(private fb: FormBuilder,private token: JwtService,private commonService:CommonService,private toast:ToastrService) {
    this.userDetail = this.token.decodeJwtToken();
    console.log(this.userDetail)
    this.complainForm = this.fb.group({
      message: ["", [Validators.required]],
      topics: ["", [Validators.required]],
      type: ["", [Validators.required]],
      user: this.fb.group({
        id: [this.userDetail.userId]
      }),
      status:"PENDING"

    })
  }
  ngOnInit() {
    this.loading = false;
    this.getComplaintById(this.userDetail.userId);
  }
  submit() {
    if (this.complainForm.invalid) {
      return
    }
    if (this.complainForm.value.type === 'Complain') {

      this.submitComplain();
      this.getComplaintById(this.userDetail.userId);


    } else if (this.complainForm.value.type === 'Feedback') {
      this.submitFeedback()
    }
  }
  submitFeedback() {
    
      const formData = this.complainForm.value;
      this.commonService.addFeedback(formData).subscribe(
        (response) => {
         
          console.log('Feedback submitted successfully', response);
          this.toast.success("Feedback send")
          
        },
        (error) => {
        
          console.error('Error submitting feedback', error);
        }
      );
    }
    submitComplain() {
    
      const formData = this.complainForm.value;
      this.commonService.addComplain(formData).subscribe(
        (response) => {
         
          console.log('complains submitted successfully', response);
          this.toast.success("complains send")
          
        },
        (error) => {
        
          console.error('Error submitting complains', error);
        }
      );
    }
  

    getComplaintById(id: any): void {
      debugger
      this.commonService.getComplain(id).subscribe((res) => {
        this.complains = res.complainList; 
        console.log("complaints=", this.complains);
      });
    }
}