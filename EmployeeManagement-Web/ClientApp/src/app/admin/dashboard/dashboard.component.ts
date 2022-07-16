import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CompanyModel } from 'src/app/login/models/company/company.module';
import { EmployeeModel } from 'src/app/login/models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }
  companyDDdetails: any = [];
  allEmpDetails: any = [];
  allEmpDetails1: EmployeeModel[] = [];
  allProjDetails: any = [];

  allCompanyDetails=[];
  employees: EmployeeModel[]=[];
  companyDD!: FormGroup;
  ngOnInit(): void {

    this.companyDD = this.formBuilder.group({
      companyDDFields: ["",""]
    });
   this.getCompanyDetailsForDropdown();
   this.getAllEmployee();
  }

  getCompanyDetailsForDropdown(){
    debugger;
    this.allEmpDetails = [];
    this.authenticationService.getCompanyDetails()
    .subscribe(
      (data : any) => {
        debugger;
        this.companyDDdetails = data;
        
      })
  }

  OnCompanyDDChange(compId:any){
    this.authenticationService.getEmpDetailsByCompanyId(compId)
    .subscribe(
      (data : any) => {
        debugger;
        this.allEmpDetails = data;
        
      })
      this.employees = this.allEmpDetails1.filter(x=>x.companyId == compId);

  }

  OnEmpDDChange(empId:any){
    //alert(compId);
    // this.authenticationService.getProjectDetailsByProjId(projId)
    // .subscribe(
    //   (data : any) => {
    //     debugger;
    //     this.allProjDetails = data;
        
    //   })
    this.employees = this.allEmpDetails1.filter(x=>x.id == empId);
  }

  //To get All employee details
  getAllEmployee(){
    this.authenticationService.getEmpDetails()
    .subscribe(
      (data : any) => {
        this.allEmpDetails1 = data;
      })
  }

  // OnProjectDDChange(projId:any){

  // }
}
