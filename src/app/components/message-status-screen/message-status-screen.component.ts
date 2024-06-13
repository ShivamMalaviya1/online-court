import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-message-status-screen',
  templateUrl: './message-status-screen.component.html',
  styleUrls: ['./message-status-screen.component.scss']
})
export class MessageStatusScreenComponent implements OnInit {
  customers!: any[];

  selectedCustomers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  @ViewChild('addCasePanel') addCasePanel: any;
  addCaseForm: any;
  allMessages: any;

  constructor(private fb: FormBuilder, private commonService :CommonService) {
    this.initializeForm();
  }
  initializeForm() {
    this.addCaseForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      courtComplex: ['', Validators.required],
      caseNumber: ['', Validators.required],
      cnrNumber: [null, Validators.required],
      caseDate: [null, Validators.required],
      caseType: ['', Validators.required],
    });
  }

  showAddCasePanel() {
    this.addCasePanel.toggle(event);
  }

  submitAddCaseForm() {
    if (this.addCaseForm.valid) {
      
      this.addCasePanel.hide();
      this.initializeForm();
    }
  }
  countryOptions = [
    
  ];
  
  stateOptions = [
   
    // Add more states as needed
  ];
  
  districtOptions = [
  
    // Add more districts as needed
  ];
  
  caseTypeOptions = [
   
  ];
  
  ngOnInit() {
    this.commonService.getAllMessages().subscribe((res:any)=>{
      if(res){

      

        res.map((data:any)=>{

          this.customers.push(data);
        })
        
      }else{
        console.log("error")
      }
    })
    this.customers = [
      
    ];
    this.loading = false;

    this.customers.forEach(
      (customer) => (customer.date = new Date(<Date>customer.date))
    );

    this.representatives = [
     
    ];

    this.statuses = [
      
    ];
  }

  getSeverity(status: any): any {
    switch (status) {
      case 'Success':
        return 'danger';

      case 'Failed':
        return 'success';

      case 'Pending':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }
}
