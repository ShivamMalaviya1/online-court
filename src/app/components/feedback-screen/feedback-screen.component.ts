import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-screen',
  templateUrl: './feedback-screen.component.html',
  styleUrls: ['./feedback-screen.component.scss']
})
export class FeedbackScreenComponent implements OnInit {
  feedbacks!: any[];
  
  selectedCustomers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  addCaseForm: any;
  statusOptions: any[];
  selectedStatus: any;

  constructor(private fb: FormBuilder,private toast:ToastrService, private commonService:CommonService) {
    this.statusOptions = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Received', value: 'Received' },
      { label: 'Resolved', value: 'Resolved' },
      { label: 'Unresolved', value: 'Unresolved' },
      { label: 'Closed', value: 'Closed' }
    ];
  }
  ngOnInit() {
    this.feedbacks = [
    
    ];
    this.commonService.getUserFeedbacks().subscribe((apiResponse: any) => {
      // Assuming apiResponse is an array of feedback items
      this.feedbacks = apiResponse.map((feedbackItem: any) => {
        return {
          id: feedbackItem.id,
          complainNumber: feedbackItem.feedbackList[0]?.id, // Assuming feedbackList is an array
          customerId: feedbackItem.id,
          customerName: `${feedbackItem.firstName} ${feedbackItem.lastName}`,
          date: feedbackItem.feedbackList[0]?.createdAt, // Assuming createdAt is the date you want
          email: feedbackItem.email,
          message: feedbackItem.feedbackList[0]?.message,
          validateAndApprove: feedbackItem.feedbackList[0]?.createdAt, // Change this if needed
          nextDate: feedbackItem.feedbackList[0]?.createdAt, // Change this if needed
          status: 'Pending', // Set a default status or determine it based on your logic
        };
      });
    
      // Now 'this.feedbacks' has the transformed structure you can use in your HTML
    });
    this.loading = false;

   
    
    this.feedbacks.forEach(
      (feedback) => (feedback.date = new Date(<Date>feedback.date))
    );

  }
}

