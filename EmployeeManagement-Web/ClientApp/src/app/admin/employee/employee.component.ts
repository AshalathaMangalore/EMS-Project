import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employeeForm!:FormGroup;
  submitted: Boolean = false;
  allEmployeeDetails:any=[];

  constructor(private formBuilder: FormBuilder,  private authenticationService: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
    });
    debugger
    this.getAllEmployee();

  }


  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  getAllEmployee(){
    this.submitted = true;
    if (this.employeeForm.invalid)
      return;
        this.authenticationService.getAllEmployee()
      .subscribe(
        (data : any) => {
          this.allEmployeeDetails = data;
          if(confirm("Successful")==true)
          this.clearForm();
      
        })
  }

  clearForm(){
    this.employeeForm.reset({
      'companyId':'',
    })
  }

  

}