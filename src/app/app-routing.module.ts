import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { CaseHistoryScreenComponent } from './components/case-history-screen/case-history-screen.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FeedbackScreenComponent } from './components/feedback-screen/feedback-screen.component';
import { PaymentScreenComponent } from './components/payment-screen/payment-screen.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileModificationScreenComponent } from './components/profile-modification-screen/profile-modification-screen.component';
import { CaseStatusScreenComponent } from './components/case-status-screen/case-status-screen.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CasePageComponent } from './components/case-page-screen/case-page-screen.component';
import { MobileScreenComponent } from './components/mobile-screen/mobile-screen.component';
import { AuthGuard } from '../guard/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MessageStatusScreenComponent } from './components/message-status-screen/message-status-screen.component';
import { ComplaintsScreenComponent } from './components/complaints-screen/complaints-screen.component';
import { TransactionsScreenComponent } from './components/transactions-screen/transactions-screen.component';
import { PackageSelectionScreenComponent } from './components/package-selection-screen/package-selection-screen.component';
import { CustomerComplaintsScreenComponent } from './components/customer-complaints-screen/customer-complaints-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'case-history', component: CaseHistoryScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'message-status', component: MessageStatusScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'case-page', component: CasePageComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'package-selection', component: PackageSelectionScreenComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'mobile-management', component: MobileScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'feedback-list', component: FeedbackScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'customer-complaints', component: CustomerComplaintsScreenComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'complaints-list', component: ComplaintsScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'transactions', component: TransactionsScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'payment', component: PaymentScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'profile-modify', component: ProfileModificationScreenComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
