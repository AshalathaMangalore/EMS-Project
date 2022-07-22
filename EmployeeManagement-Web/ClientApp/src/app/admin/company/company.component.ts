import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  CompanyForm!: FormGroup;
  allCompanyDetails: any = [];
  show: boolean=false;
  show3: boolean=false;
  Submit: boolean=true;
  EditCheck: boolean=false;
  companyId: any;
  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService) { }
  
  ngOnInit(): void {
    this.CompanyForm = this.formBuilder.group({
      companyname: ["", Validators.required],
      companyPhone: ["", Validators.required],
      companyAddress: ["", Validators.required],
    });

    this.getCompanyDetails();
  }

  onSubmit(){
    if(this.EditCheck == false)
    {
    if (this.CompanyForm.invalid)
      return;
      if(this.CompanyForm.value.companyname == null)
      {
        this.show3 = true;
      }
      const companyname = this.CompanyForm.value.companyname;
      const companyPhone = this.CompanyForm.value.companyPhone;
      const companyAddress = this.CompanyForm.value.companyAddress;
      
        this.authenticationService.SaveCompany(companyname, companyPhone, companyAddress)
      .subscribe(
        (data : any) => {
          //this.router.navigate(["/admin"]);
          // if(confirm("Succefully Added Company Details") == true){
          //   this.clearForm();
          // }
          this.show = true;
        })
      }
      else{
        const companyid = this.companyId;
        const companyname = this.CompanyForm.value.companyname;
        const companyPhone = this.CompanyForm.value.companyPhone;
        const companyAddress = this.CompanyForm.value.companyAddress;
        
        this.authenticationService.EditCompany(companyid, companyname,companyPhone, companyAddress)
      .subscribe(
        (data : any) => {
          this.show = true;
          this.Submit = true;
        })
      }
  }

  closePopup()
  {
    this.show = !this.show;
    this.clearForm();
  }

  clearForm() {
    this.CompanyForm.reset({
          'companyname': '',
          'companyPhone': '',
          'companyAddress': ''
         });
    }

    get f(): { [key: string]: AbstractControl } {
      return this.CompanyForm.controls;
    }

    getCompanyDetails(){
      this.authenticationService.getCompanyDetails()
      .subscribe(
        (data : any) => {
          debugger;
          this.allCompanyDetails = data;
        })
    }

    delete(compId: any){
      this.authenticationService.deleteCompanyDetails(compId)
      .subscribe(
        (data : any) => {
          debugger;
          data;
          //this.allCompanyDetails = data;
        })
    }

    edit(compId: any){
      this.authenticationService.getCompanyDetailsById(compId)
      .subscribe(
        (data : any) => {
          debugger;
          //this.companyDetail = data;
          // this.CompanyForm.se({
          //   'companyname': data.companyName,
          //   'companyPhone': data.companyPhone,
          //   'companyAddress': data.companyAddress
          //  });

           this.CompanyForm = this.formBuilder.group({
            companyname: [data.companyName, ''],
            companyPhone: [data.companyPhone, ''],
            companyAddress: [data.companyAddress, ''],
          });
          this.companyId = data.companyId;
          this.Submit = false;
          this.EditCheck = true;
        })
    }
    get err(){
      return this.CompanyForm.controls;
    }
    
    
  
}
