import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complaints-screen',
  templateUrl: './complaints-screen.component.html',
  styleUrls: ['./complaints-screen.component.scss']
})
export class ComplaintsScreenComponent implements OnInit {

  complains: any[] = [];
  loading: boolean = false;
  statusOptions: any[] = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Received', value: 'RECIEVED' },
    { label: 'Resolved', value: 'RESOLVED' },
    { label: 'Unresolved', value: 'UNRESOLVED' },
    { label: 'Closed', value: 'CLOSED' }
  ];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private toast: ToastrService
  ) { } 

  ngOnInit() {
    this.loadComplaintsLazy();
  }

  loadComplaintsLazy() {
    this.getAllComplaints();
  }

  async getAllComplaints() {
    try {
      // Adjust your API call based on pagination parameters if needed
      const apiData = await this.commonService.getComplainAllComplains().toPromise();

      this.complains = apiData.flatMap((item: any) =>
        item.complain.map((complain: any) => ({
          id: complain.id,
          complainNumber: `CNR${complain.id}`,
          customerId: `CASE${complain.id}`,
          customerName: `${complain.user.firstName} ${complain.user.lastName}`,
          email: complain.user.email,
          date: complain.createdAt,
          topic: complain.topics,
          message: complain.message,
          status: complain.status,
        }))
      );

      console.log("complain data", this.complains);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      this.loading = false;
    }
  }

  onStatusChange(complain: any) {
    let status = complain.status.toUpperCase();
    this.updateStatus(complain.id, status);
  }

  updateStatus(complaintId: number, newStatus: string) {
   
    this.commonService.updateComplaintStatus(complaintId, newStatus).subscribe(
      (res) => {
       
        if (res.success) {
          this.showStatusUpdateToast(newStatus);
        } else {
          this.toast.error('Failed to update status. Please try again.');
        }
      },
      (error) => {
        // Check the error status and show toast accordingly
        if (error.status === 400) {
         
          this.toast.error('Bad Request.');
        } 
        if (error.status === 401) {
          // Unauthorized error
          this.toast.error('Unauthorized. Please log in.');
        } else if (error.status === 403) {
          // Forbidden error
          this.toast.error('You do not have permission to perform this action.');
        } else {
          // Other errors
          console.error('Error updating status:', error);
          // this.toast.error('Failed to update status. Please try again.');
        }
      }
    );
  }
  
  private showStatusUpdateToast(status: string) {
    this.toast.success(`Status Update with ${status}`);
  }
}
