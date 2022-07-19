import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CompanyModel } from 'src/app/login/models/company/company.module';
import { EmployeeModel } from 'src/app/login/models/employee.model';
import { ProjectModel } from 'src/app/login/models/project/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }
  companyDDdetails: any = [];
  projectDDdetails:any = [];
  allEmpDetails: any = [];
  allEmpDetails1: EmployeeModel[] = [];
  allProjDetails1: ProjectModel[] = [];

  allCompanyDetails=[];
  employees: EmployeeModel[]=[];
  project: ProjectModel[]=[];
  companyDD!: FormGroup;
  ngOnInit(): void {

    this.companyDD = this.formBuilder.group({
      companyDDFields: ["",""]
    });
   this.getCompanyDetailsForDropdown();
   this.getAllEmployee();
   this.getAllProjectDetails();
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
        console.log(data);
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

  getAllProjectDetails(){
    this.authenticationService.getProjectDetails()
    .subscribe(
      (data : any) => {
        this.projectDDdetails = data;        
      })
  }
  OnProjectDDChange(projId:any){
      this.employees = this.allEmpDetails1.filter(x=>x.projectId==projId);
  }
}
