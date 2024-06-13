import { Component, ViewChild } from "@angular/core";
import { OverlayPanel } from "primeng/overlaypanel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "src/services/common.service";
import { JwtService } from "src/services/jwt.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-case-page",
  templateUrl: "./case-page-screen.component.html",
  styleUrls: ["./case-page-screen.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class CasePageComponent {
  customers!: any[];

  selectedCustomers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  @ViewChild("addCasePanel") addCasePanel: any;
  addCaseForm: any;
  userDetail: any;
  id: any;
  caseData: any;
  cases: any = [];
  caseItem: any;

  constructor(
    private fb: FormBuilder,
    private commnonService: CommonService,
    private token: JwtService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.initializeForm();
    this.userDetail = this.token.decodeJwtToken();
    this.id = this.userDetail.userId;
  }
  initializeForm() {
    this.addCaseForm = this.fb.group({
      // country: ['', Validators.required],
      // state: ['', Validators.required],
      // district: ['', Validators.required],
      // courtComplex: ['', Validators.required],
      // caseNumber: ['', Validators.required],
      cnrNumber: [null, Validators.required],
      status: ["search", Validators.required], // Assuming you want to include 'status'
      // caseDate: [null, Validators.required],
      // caseType: ['', Validators.required],
    });
  }
  selectedCases: any[] = [];
  sendWhatsAppMessage(): void {
    const selectedMasterIds: any[] = this.selectedCases.map(selectedCase => selectedCase.caseMaster.id);
  
    this.commnonService.postManualMessages(selectedMasterIds).subscribe(
        (response) => {
            console.log(response);
  
            if (response.data) {
                for (const caseId in response.data) {
                    if (response.data.hasOwnProperty(caseId)) {
                        const caseDetails = response.data[caseId];
                        const caseKey = Object.keys(caseDetails)[0]; // Assuming there's only one case per caseId
  
                        if (caseDetails && caseDetails[caseKey] && caseDetails[caseKey].limit === 0) {
                            const cnrNumber = caseKey.match(/cnrNumber='(.*?)'/)?.[1]; 
                            if (cnrNumber) {
                                this.toastr.warning(`Message cannot be sent for ${cnrNumber}. Limit is 0.`);
                            } else {
                                this.toastr.warning("Unable to extract cnrNumber");
                            }
                        } else {
                            this.toastr.success("Message sent successfully");
                        }
                    }
                }
            } else {
                this.toastr.error("Invalid response structure");
            }
        },
        (error) => {
            console.error(error);
            this.toastr.error("Error sending message");
        }
    );
  }
  
  showAddCasePanel(event: any) {
    this.addCasePanel.show(event);
  }
  searchingCase: any = null;

  submitAddCaseForm() {
    debugger;
    this.searchingCase = "Searching Case.....";
    if (this.addCaseForm.valid) {
      const formData = this.addCaseForm.value;

      this.commnonService.searchCase(formData, this.id).subscribe(
        (res) => {
          console.log("case page data", res);
          this.searchingCase = null;
          if (res.data) {
            // Assuming 'cnrNumber' is present in the response
            const cnrNumber = res.cnrNumber;
            // Set 'cnrNumber' in the form
            this.addCaseForm.get("cnrNumber").setValue(cnrNumber);
            this.caseData = res.data;
            this.visible = true;
          }
        },
        (error) => {
          this.searchingCase = null;
          this.toastr.warning("Error fetching case data");
          console.error("", error);
          // Handle the error as needed
        },
        () => {
          // Optional: Handle completion if needed
        }
      );

      this.addCasePanel.hide();
      this.initializeForm();
    }
  }
  saveCase() {
    this.getCaseForUsers();
    this.addCaseForm.get("status").setValue("save");
    const formData = this.addCaseForm.value;

    this.commnonService.saveCase(formData, this.id).subscribe(
      (response) => {
        console.log("Case saved successfully:", response);
        this.getCaseForUsers();
        this.visible = false;
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Case Added",
        });
      },
      (error) => {
        this.toastr.warning("Error saving case");

        console.error("Error saving case:", error);
        // Handle the error as needed
      },
      () => {
        // Optional: Handle completion if needed
      }
    );
  }

  getCaseForUsers() {
    this.commnonService.getCasesByUserId(this.id).subscribe(
      (res) => {
        this.caseItem = res;
        console.log("Cases:", this.caseItem);
      },
      (error) => {
        this.toastr.warning("Error fetching cases");
        console.error("Error fetching cases:", error);
        // Handle the error as needed
      }
    );
  }

  cancel() {
    this.visible = false;
  }

  // dialog box
  visible: boolean = false;

  showDialog() {}
  confirm2(event: any, caseItem: any) {
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
        this.deleteCase(caseItem);
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
  deleteCase(caseItem: any) {
    console.log("caseitem", caseItem);
    if (caseItem) {
      this.commnonService.deleteCase(caseItem.id).subscribe(
        (response) => {
          console.log("Case deleted successfully:", response);

          // Optional: Show toaster notification here
          this.messageService.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Record deleted",
          });
          this.getCaseForUsers();
          this.getCaseForUsers();
        },
        (error) => {
          console.error("Error deleting case:", error);
          this.toastr.warning("Error deleting case");
        }
      );
    }
  }

  ngOnInit() {
    this.getCaseForUsers();
    this.customers = [
      {
        Id: 1,
        cnrNumber: 1012,
        caseNumber: 21,
        partyName: "Jones",
        nextDate: new Date(),
        validateAndApprove: "approved",
      },
    ];

    this.loading = false;

    this.customers.forEach(
      (customer) => (customer.date = new Date(<Date>customer.date))
    );

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "Xuxue Feng", image: "xuxuefeng.png" },
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" },
    ];
  }

  getSeverity(status: any): any {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  }
}
