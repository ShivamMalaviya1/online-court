import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { JwtService } from 'src/services/jwt.service';

@Component({
  selector: 'app-transactions-screen',
  templateUrl: './transactions-screen.component.html',
  styleUrls: ['./transactions-screen.component.scss']
})
export class TransactionsScreenComponent implements OnInit {
  transactions: any[] = []; 
  selectedCustomers!: any[];
  selectAdminData!:any[];
  representatives!: any[];
  statuses!: any[];
  // loading: boolean = true;
  activityValues: number[] = [0, 100];
  addCaseForm: any;
  statusOptions: any[];
  selectedStatus: any;
  userDetail: any;
  id: any;
  email:any;
  adminSideTransaction:any[]=[]

  adminTrsnaction = false
  constructor(private fb: FormBuilder, 
    private common: CommonService, 
    private token: JwtService,
    private toast: ToastrService, private commonService: CommonService) {
    this.userDetail = this.token.decodeJwtToken();
    this.id = this.userDetail.userId;
    this.statusOptions = [
     
    ];
  }

  ngOnInit() { 
    this.commonService.getUserTransactions(this.id).subscribe((res: any) => {
     
      this.transactions =res
      // console.log("transaction" ,this.transactions)
      this.adminTrsnaction=false
      
      // this.transactions.
      
      // this.loading = false;
      // this.transactions.forEach(
      //   (transaction) => (transaction.date = new Date(transaction.date))
      // );
    }, (err) => {
      // console.log(err)
      this.toast.error(err.message)
    });


    this.commonService.getAttTrsnaction().subscribe((res:any)=>{

      if (res){

        this.adminSideTransaction=res
        // console.log(this.adminSideTransaction)
          this.adminTrsnaction = true

      }

      // console.log(this.adminSideTransaction)
    })
  }

}

