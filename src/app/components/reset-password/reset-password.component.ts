// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from 'src/services/auth.service';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.scss']
// })
// export class ResetPasswordComponent implements OnInit {

//   resetPasswordForm: any;
//   submitted = false;
//  userId:any
//   constructor(private fb: FormBuilder, private authService: AuthService,) { }

//   ngOnInit() {
//     this.initForm();
//     let id  = localStorage.getItem("id");
//     if (id){
//       let parsedId= JSON.parse(id)
//       this.userId=parsedId
//     }
//   }

//   private initForm() {
//     this.resetPasswordForm = this.fb.group({
//       userId:[""],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     this.submitted = true;
//     if (this.passwordsMatch()) {
//       const userId = this.userId;
//       const newPassword = this.resetPasswordForm.get('password').value;
//       this.authService.resetPassword(userId, newPassword).subscribe(
//         (response) => {
//           console.log('Password reset successful:', response);
//         },
//         (error) => {
//           console.error('Error resetting password:', error);
          
//         }
//       );
//     }
//   }

//   passwordsMatch(): boolean {
//     const password = this.resetPasswordForm.get('password').value;
//     const confirmPassword = this.resetPasswordForm.get('confirmPassword').value;
//     return password === confirmPassword;
//   }

//   passwordsDoNotMatch(): boolean {
//     return this.submitted && !this.passwordsMatch();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: any;
  submitted = false;
  userId: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    let id = localStorage.getItem("id");
    if (id) {
      this.userId = JSON.parse(id);
    }
  }

  private initForm() {
    this.resetPasswordForm = this.fb.group({
      userId: [""],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordsMatch()) {
      const userId = this.userId;
      const newPassword = this.resetPasswordForm.get('password').value;
      this.authService.resetPassword(userId, newPassword).subscribe(
        (response) => {
          console.log('Password reset successful:', response);
          this.toastr.success('Password reset successful.');
        },
        (error) => {
          console.error('Error resetting password:', error);
          this.toastr.error('Error resetting password.');
        }
      );
    }
  }

  passwordsMatch(): boolean {
    const password = this.resetPasswordForm.get('password').value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword').value;
    return password === confirmPassword;
  }

  passwordsDoNotMatch(): boolean {
    return this.submitted && !this.passwordsMatch();
  }
}
