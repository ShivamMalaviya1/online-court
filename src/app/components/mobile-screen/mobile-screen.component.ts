// // import { Component } from '@angular/core';
// // import { FormBuilder, Validators } from '@angular/forms';
// // import { ToastrService } from 'ngx-toastr';
// // import { PrimeNGConfig } from 'primeng/api';
// // import { CommonService } from 'src/services/common.service';
// // import { JwtService } from 'src/services/jwt.service';
// // import { UserService } from 'src/services/user.service';

// // @Component({
// //   selector: 'app-mobile-screen',
// //   templateUrl: './mobile-screen.component.html',
// //   styleUrls: ['./mobile-screen.component.scss']
// // })
// // export class MobileScreenComponent {
// //   numbers: string[] = [];
// //   addNumberForm: any;
// //   displayModal: boolean = false;
// //   selectedPackageId:any;
// //   userId:any;
// //   userDetail: any;

// //   constructor(private fb: FormBuilder, private token: JwtService,
// //     private primengConfig: PrimeNGConfig, private common: CommonService,
// //     private toast: ToastrService,private userService:UserService) {
// //     this.userDetail = this.token.decodeJwtToken();
// //     this.userId = this.userDetail.userId;

// //      this.userService.getUserById(this.userId).subscribe((userdata)=>{
// //       this.selectedPackageId= userdata.selectedPackagesList[0].id;

// //       })
// //     this.addNumberForm = this.fb.group({
// //       mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
// //     });

// //     // Configure PrimeNG to use ripple effect
// //     this.primengConfig.ripple = true;
// //   }

// //   openAddNumberModal() {
// //     this.displayModal = true;
// //   }

// //   addNumber() {
// //     const mobileNumber = this.addNumberForm.get('mobileNumber').value;
// //     let obj: any = {}
// //     obj.number = mobileNumber
// //     obj.numbers = mobileNumber
// //     obj.userId = this.token.decodeJwtToken().userId,
// //       obj.packageId = ""
// //     if (this.addNumberForm.valid && !this.numbers.includes(mobileNumber)) {
// //       this.common.addPackageMobile(obj).subscribe((data) => {
// //         this.toast.success("Number Added")
// //         this.displayModal = false;
// //         this.addNumberForm.reset();
// //       }, (error) => {
// //         this.toast.error(error.message)
// //       })
// //       this.numbers.push(mobileNumber);
// //       this.displayModal = false;
// //       this.addNumberForm.reset();
// //     }
// //   }

// //   deleteNumber(mobileNumber: string) {
// //     const index = this.numbers.indexOf(mobileNumber);
// //     this.common.deletePackageMobile(mobileNumber).subscribe((data) => {
// //       this.toast.success("Number deleted")

// //     }, (error) => {
// //       this.toast.error(error.message)
// //     })
// //     if (index !== -1) {
// //       this.numbers.splice(index, 1);
// //     }
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { PrimeNGConfig } from 'primeng/api';
// import { CommonService } from 'src/services/common.service';
// import { JwtService } from 'src/services/jwt.service';
// import { UserService } from 'src/services/user.service';

// @Component({
//   selector: 'app-mobile-screen',
//   templateUrl: './mobile-screen.component.html',
//   styleUrls: ['./mobile-screen.component.scss']
// })
// export class MobileScreenComponent implements OnInit {
//   numbers: string[] = [];
//   addNumberForm: any;
//   displayModal: boolean = false;
//   selectedPackageId: any;
//   userId: any;
//   userDetail: any;
//   id: any;
//   packages: any;
//   mobileMaintenances: any;

//   constructor(
//     private fb: FormBuilder,
//     private token: JwtService,
//     private primengConfig: PrimeNGConfig,
//     private common: CommonService,
//     private toast: ToastrService,
//     private userService: UserService

//   ) {
//     this.userDetail = this.token.decodeJwtToken();
//     this.id = this.userDetail.userId;
//   }

//   ngOnInit() {

//     this.common.getUserTransactions(this.id).subscribe((res: any) => {

//       this.packages = res[0]
//       console.log(this.packages)

//       // this.transactions.

//       // this.loading = false;
//       // this.transactions.forEach(
//       //   (transaction) => (transaction.date = new Date(transaction.date))
//       // );
//     }, (err) => {
//       console.log(err)
//       this.toast.error(err.message)
//     });

//     this.userDetail = this.token.decodeJwtToken();
//     this.userId = this.userDetail.userId;
//     this.getNumber()

//     this.addNumberForm = this.fb.group({
//       mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//     });

//     this.primengConfig.ripple = true;

//   }

//   openAddNumberModal() {
//     this.displayModal = true;
//   }

//   addNumber() {
//     const mobileNumber = this.addNumberForm.get('mobileNumber').value;
//     if (this.addNumberForm.valid && !this.numbers.includes(mobileNumber)) {
//       const requestBody = {
//         numbers: mobileNumber,
//         userSelectedPackage: {
//           id: this.selectedPackageId,
//         },
//         user: {
//           id: this.userId,
//         },
//       };

//       this.common.addPackageMobile(requestBody).subscribe(
//         (data) => {
//           console.log(data)
//           this.toast.success('Number Added');
//           this.displayModal = false;
//           this.getNumber()
//           this.addNumberForm.reset();

//         },
//         (error) => {
//           console.log(error)

//           this.toast.error(error.error.error);
//         }
//       );
//     }
//   }
//   getNumber() {
//     this.userService.getUserById(this.userId).subscribe((userdata) => {
//       this.selectedPackageId = userdata.selectedPackagesList[0].id;
//       console.log(this.selectedPackageId);

//       // Extract mobile maintenance data including ID and isActive
//       this.mobileMaintenances = userdata.selectedPackagesList[0].mobileMaintainanceList
//         .map((mobileMaintenance: any) => {
//           return {
//             id: mobileMaintenance.id,
//             number: mobileMaintenance.numbers,
//             isActive: mobileMaintenance.active,
//           };
//         });
//         console.log(this.mobileMaintenances)

//       // If you want to remove duplicates from the numbers array
//       // this.mobileMaintenances = this.removeDuplicates(this.mobileMaintenances, 'number');
//     });
//   }

//   deleteNumber(mobileMaintenanceId: number) {
//     this.userService.deleteMobileMaintainance(mobileMaintenanceId).subscribe(
//       () => {
//         console.log(`Mobile maintenance with ID ${mobileMaintenanceId} deleted successfully.`);
//         this.getNumber();
//       },
//       (error) => {
//         console.error('Error deleting mobile maintenance:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PrimeNGConfig } from "primeng/api";
import { CommonService } from "src/services/common.service";
import { JwtService } from "src/services/jwt.service";
import { UserService } from "src/services/user.service";
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from "primeng/api";

@Component({
  selector: "app-mobile-screen",
  templateUrl: "./mobile-screen.component.html",
  styleUrls: ["./mobile-screen.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class MobileScreenComponent implements OnInit {
  numbers: string[] = [];
  addNumberForm: any;
  displayModal: boolean = false;
  selectedPackageId: any;
  userId: any;
  userDetail: any;
  id: any;
  packages: any;
  mobileMaintenances: any;

  constructor(
    private fb: FormBuilder,
    private token: JwtService,
    private primengConfig: PrimeNGConfig,
    private common: CommonService,
    private toastr: ToastrService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.userDetail = this.token.decodeJwtToken();
    this.id = this.userDetail.userId;
  }

  ngOnInit() {
    this.common.getUserTransactions(this.id).subscribe(
      (res: any) => {
        this.packages = res[0];
        console.log(this.packages);
      },
      (err) => {
        console.log(err);
        this.showToast(err.message, "error");
      }
    );

    this.userDetail = this.token.decodeJwtToken();
    this.userId = this.userDetail.userId;
    this.getNumber();

    this.addNumberForm = this.fb.group({
      mobileNumber: [, [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.primengConfig.ripple = true;
  }

  openAddNumberModal() {
    this.displayModal = true;
  }

  addNumber() {
    const mobileNumber = this.addNumberForm.get("mobileNumber").value;
    if (this.addNumberForm.valid && !this.numbers.includes(mobileNumber)) {
      const requestBody = {
        numbers: mobileNumber,
        userSelectedPackage: {
          id: this.selectedPackageId,
        },
        user: {
          id: this.userId,
        },
      };

      this.common.addPackageMobile(requestBody).subscribe(
        (data) => {
          console.log(data);
          this.showToast("Number Added", "success");
          this.displayModal = false;
          this.getNumber();
          this.addNumberForm.reset();
        },
        (error) => {
          console.log(error);
          this.showToast(error.error.message, "error");
        }
      );
    }
  }

  getNumber() {
    this.userService.getUserById(this.userId).subscribe((userdata) => {
      this.selectedPackageId = userdata.selectedPackagesList[0].id;
      console.log(this.selectedPackageId);

      // Extract mobile maintenance data including ID and isActive
      this.mobileMaintenances =
        userdata.selectedPackagesList[0].mobileMaintainanceList.map(
          (mobileMaintenance: any) => {
            return {
              id: mobileMaintenance.id,
              number: mobileMaintenance.numbers,
              isActive: mobileMaintenance.active,
            };
          }
        );

      console.log(this.mobileMaintenances);
    });
  }
  confirm2(event: any, mobileMaintenanceId: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteNumber(mobileMaintenanceId);
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }
  deleteNumber(mobileMaintenanceId: number) {
    this.userService.deleteMobileMaintainance(mobileMaintenanceId).subscribe(
      () => {
        console.log(
          `Mobile maintenance with ID ${mobileMaintenanceId} deleted successfully.`
        );
        // this.showToast("Number deleted", "success");
        this.getNumber();
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
      },
      (error) => {
        console.error("Error deleting mobile maintenance:", error);
        this.showToast("Error deleting number", "error");
      }
    );
  }

  // Custom method to show toasters
  showToast(message: string, type: string): void {
    switch (type) {
      case "success":
        this.toastr.success(message);
        break;
      case "error":
        this.toastr.error(message);
        break;
      // You can add more cases for different types (info, warning, etc.)
      default:
        this.toastr.info(message);
        break;
    }
  }
}
