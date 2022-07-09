import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyForm!:FormGroup;
  submitted: Boolean = false;
  allCompanyDetails: any = [];

  constructor(private formBuilder: FormBuilder,  private authenticationService: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      companyAddress: ["", Validators.required],
      companyPhone: ["", Validators.required]
    });
    debugger

    this.getCompanyDetails();

  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyForm.controls;
  }
  company(){
    this.submitted = true;
    if (this.companyForm.invalid)
      return;
      const companyName = this.companyForm.value.companyName;
      const companyAddress = this.companyForm.value.companyAddress;
      const companyPhone = this.companyForm.value.companyPhone;
        this.authenticationService.AddCompany(companyName, companyAddress, companyPhone,)
      .subscribe(
        (data : any) => {
          this.router.navigate(["/admin"]);
          if(confirm("Successfully Added")==true)
          this.clearForm();
      
        })
  }
  clearForm(){
    this.companyForm.reset({
      'companyName':'',
      'companyAddress':'',
      'companyPhone':''
    })
  }
  getCompanyDetails(){
    this.authenticationService.getCompanyDetails()
      .subscribe(
        (data : any) => {
          this.allCompanyDetails = data;
        })
  }

  deleteCmp(compId : any){
    alert(compId);
    this.authenticationService.deleteCompanyDetails(compId)
      .subscribe(
        (data : any) => {
        })


  }

  }