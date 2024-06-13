import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor/interceptor.service';
import { AppComponent } from './app.component';
import { CaseHistoryScreenComponent } from './components/case-history-screen/case-history-screen.component';
import { CaseStatusScreenComponent } from './components/case-status-screen/case-status-screen.component';
import { FeedbackScreenComponent } from './components/feedback-screen/feedback-screen.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { PaymentScreenComponent } from './components/payment-screen/payment-screen.component';
import { ProfileModificationScreenComponent } from './components/profile-modification-screen/profile-modification-screen.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// import { InputGroupModule } from 'primeng/inputgroup'
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { MessageService } from 'primeng/api';
import { CasePageComponent } from './components/case-page-screen/case-page-screen.component';
import { MobileScreenComponent } from './components/mobile-screen/mobile-screen.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MessageStatusScreenComponent } from './components/message-status-screen/message-status-screen.component';
import { ComplaintsScreenComponent } from './components/complaints-screen/complaints-screen.component';
import { TransactionsScreenComponent } from './components/transactions-screen/transactions-screen.component';
import { PackageSelectionScreenComponent } from './components/package-selection-screen/package-selection-screen.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CustomerComplaintsScreenComponent } from './components/customer-complaints-screen/customer-complaints-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CaseHistoryScreenComponent,
    CaseStatusScreenComponent,
    FeedbackScreenComponent,
    LoginScreenComponent,
    PaymentScreenComponent,
    ProfileModificationScreenComponent,
    RegisterScreenComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotfoundComponent,
    CasePageComponent,
    MobileScreenComponent,
    AdminLoginComponent,
    MessageStatusScreenComponent,
    ComplaintsScreenComponent,
    TransactionsScreenComponent,
    PackageSelectionScreenComponent,
    CustomerComplaintsScreenComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule, // Import RouterModule here
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    DividerModule,
    CheckboxModule,RadioButtonModule,
    // AvatarModule,
    // AvatarGroupModule,
    // AccordionModule,
    // AutoCompleteModule,
    // BadgeModule,
    // BreadcrumbModule,
    // BlockUIModule,


    CalendarModule,
    // CarouselModule,
    // CascadeSelectModule,
    // ChartModule,
    // CheckboxModule,
    // ChipsModule,
    // ChipModule,
    // ColorPickerModule,
    ConfirmDialogModule,
    // ConfirmPopupModule,
    // ContextMenuModule,
    // VirtualScrollerModule,
    // DataViewModule,
    DialogModule,
    // DockModule,
    // DragDropModule,
    DropdownModule,
    // DynamicDialogModule,
    // EditorModule,
    // FieldsetModule,
    // FileUploadModule,
    // GalleriaModule,
    // InplaceModule,
    // InputMaskModule,
    // InputSwitchModule,
    // InputTextModule,
    // InputTextareaModule,
    // InputNumberModule,
    // InputGroupModule,
    // InputGroupAddonModule,
    // ImageModule,
    // KnobModule,
    // ListboxModule,
    // MegaMenuModule,
    // MenuModule,
    // MessageModule,
    // MessagesModule,
    MultiSelectModule,
    // OrganizationChartModule,
    // OrderListModule,
    OverlayPanelModule,
    // PaginatorModule,
    // PanelModule,
    // PanelMenuModule,
    // PasswordModule,
    // PickListModule,
    // ProgressSpinnerModule,
    ProgressBarModule,
    // RadioButtonModule,
    // RatingModule,
    // SelectButtonModule,
    // SidebarModule,
    // ScrollerModule,
    // ScrollPanelModule,
    // ScrollTopModule,
    // SkeletonModule,
    // SlideMenuModule,
    SliderModule,
    // SpeedDialModule,
    // SpinnerModule,
    // SplitterModule,
    // SplitButtonModule,
    StepsModule,
    TableModule,
    // TabMenuModule,
    // TabViewModule,
    TagModule,
    // TerminalModule,
    // TieredMenuModule,
    // TimelineModule,
    ToastModule,
    // ToggleButtonModule,
    // ToolbarModule,
    // TooltipModule,
    // TriStateCheckboxModule,
    // TreeModule,
    // TreeSelectModule,
    // TreeTableModule,
    // AnimateModule,
    // CardModule,
    // RippleModule,
    // StyleClassModule, 

    AppRoutingModule, // Include your routing module here
    ToastrModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }, ToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
