import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { EmployeeModel } from 'src/app/login/models/employee/employee.module';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  EmployeeForm!: FormGroup;
  allEmpDetails: any =[];
  Submit: boolean=true;
  id: any;
  show : boolean=false;

  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      companyId: ["",Validators.required],
      projectId: ["",Validators.required],
      firstname: ["",Validators.required],
      lastname: ["",Validators.required],
      gender: ["",Validators.required],
      email: ["",Validators.required],
      phone: ["",Validators.required],
      datecreated: ["",Validators.required],
      datemodified: ["",Validators.required],
    });
    this.getAllEmployee();

  }
  
  onSubmit(){
    if (this.EmployeeForm.invalid)
      return;
    const companyId =parseInt( this.EmployeeForm.value.companyId );
    const projectId = parseInt( this.EmployeeForm.value.projectId );
    const firstName = this.EmployeeForm.value.firstname;
    const lastName = this.EmployeeForm.value.lastname;
    const gender = this.EmployeeForm.value.gender;
    const email = this.EmployeeForm.value.email;
    const phone = this.EmployeeForm.value.phone;
    const dateCreated = this.EmployeeForm.value.datecreated;
    const dateModified = this.EmployeeForm.value.datemodified;

    let newEmployee:EmployeeModel = {
      CompanyId:companyId,
      ProjectId:projectId,
      FirstName:firstName,
      LastName:lastName,
      Gender:gender,
      Email:email,
      Phone:phone,
      DateCreated:dateCreated,
      DateModified:dateModified
    };
    console.log(newEmployee);
    
     this.authenticationService.SaveEmployee(newEmployee)
    .subscribe(
      (data : any) => {
        this.show=true;

      console.log("Status: " + data);
      // this.clearForm();
    });

    // this.getAllEmployee();

  }


  getAllEmployee(){
    this.authenticationService.getEmpDetails()
    .subscribe(
      (data : any) => {
        debugger;
        this.allEmpDetails = data;
        
      })
  }

  clearForm() {
    this.EmployeeForm.reset({
          'companyId': '',
          'projectId': '',
          'firstName': '',
          'lastName': '',
          'gender': '',
          'email': '',
          'phone': '',
          'dateCreated': '',
          'dateModified': '',
         });
    }
 
  editEmp(empId:any){
    alert(empId);
    this.authenticationService.getEmployeeById(empId)
    .subscribe(
      (data:any)=>{
        console.log(data);
        debugger
        this.EmployeeForm = this.formBuilder.group({
          firstName:[data.firstName, ''],
          lastName:[data.lastName, ''],
          phone:[data.phone, ''],
          email:[data.email, '']
        });
        this.id=data.id;
      })
  }

  closePopup()
  {
    this.show = !this.show;
    this.clearForm();
  }
}
