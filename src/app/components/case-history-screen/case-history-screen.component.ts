import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtService } from 'src/services/jwt.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-history-screen',
  templateUrl: './case-history-screen.component.html',
  styleUrls: ['./case-history-screen.component.scss']
})
export class CaseHistoryScreenComponent implements OnInit {
  cases!: any[];

  selectedCases: any[] = [];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  @ViewChild('addCasePanel') addCasePanel: any;
  addCaseForm: any;
  caseDetails: any;
  userDetail: any;
  id: any;
  userCase: any;
  userCasesdata=false;

  constructor(private fb: FormBuilder,private commonService:CommonService, private token: JwtService,private toast:ToastrService) {
    this.initializeForm();
    this.userDetail = this.token.decodeJwtToken();
    this.id = this.userDetail.userId;
  }
//   sendWhatsAppMessage(): void {
//     const selectedMasterIds: any[] = this.selectedCases.map(selectedCase => selectedCase.caseMaster.id);

//     this.commonService.postManualMessages(selectedMasterIds).subscribe(
//         (response) => {
//             console.log(response);
            
//             if (response.data && response.data['1'] && response.data['1']['CaseDetails{id=1, cnrNumber=\'TNCH120008992023\'}']) {
//                 const limit = response.data['1']['CaseDetails{id=1, cnrNumber=\'TNCH120008992023\'}'].limit;

//                 if (limit === 0) {
//                     this.toast.warning("Message cannot be sent. Limit is 0.");
//                 } else {
//                     this.toast.success("Message sent successfully");
//                 }
//             } else {
//                 this.toast.error("Invalid response structure");
//             }
//         },
//         (error) => {
//             console.error(error);
//             this.toast.error("Error sending message");
//         }
//     );
sendWhatsAppMessage(): void {
  const selectedMasterIds: any[] = this.selectedCases.map(selectedCase => selectedCase.caseMaster.id);

  this.commonService.postManualMessages(selectedMasterIds).subscribe(
      (response) => {
          console.log(response);

          if (response.data) {
              for (const caseId in response.data) {
                  if (response.data.hasOwnProperty(caseId)) {
                      const caseDetails = response.data[caseId];
                      const caseKey = Object.keys(caseDetails)[0]; 

                      if (caseDetails && caseDetails[caseKey] && caseDetails[caseKey].limit === 0) {
                          const cnrNumber = caseKey.match(/cnrNumber='(.*?)'/)?.[1]; 
                          if (cnrNumber) {
                              this.toast.warning(`Message cannot be sent for ${cnrNumber}. Limit is 0.`);
                          } else {
                              this.toast.warning("Unable to extract cnrNumber");
                          }
                      } else {
                          this.toast.success("Message sent successfully");
                      }
                  }
              }
          } else {
              this.toast.error("Invalid response structure");
          }
      },
      (error) => {
          console.error(error);
          this.toast.error("Error sending message");
      }
  );
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
      // Handle form submission logic here
      // You can access form values using this.addCaseForm.value
      this.addCasePanel.hide();
      this.initializeForm();
    }
  }
  
  ngOnInit() {

    this.commonService.getAllCases().subscribe((res:any)=>{
      if(res){
       this.caseDetails= res;
       console.log(this.caseDetails)
      }
      else{
        console.log("no data found")
      }
    })

    this.commonService.getCasesByUserId(this.id).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userCase = [];  // Initialize userCases as an array
    
        res.forEach((data: any) => {
          console.log("Data", data);
    
          // Extract caseDetails from each caseMaster
          const caseDetailsArray = data.caseMaster.caseDetails;
    
          // Add caseDetailsArray to userCases
          this.userCase.push(...caseDetailsArray);
        });
    
        this.userCasesdata = true;
        console.log("All caseDetails", this.userCase);
      } else {
        console.log("No data found");
      }
    });
    
  

  
    this.loading = false;

    this.cases.forEach(
      (customer) => (customer.date = new Date(<Date>customer.date))
    );

  
  }

  getSeverity(status: any): any {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }
}
