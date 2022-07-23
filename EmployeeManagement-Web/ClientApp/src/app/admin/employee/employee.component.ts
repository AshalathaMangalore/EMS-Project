import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { EditemployeeModule } from 'src/app/login/models/employee/editEmployeeModule';
import { EmployeeModel } from 'src/app/login/models/employee/employee.module';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  EmployeeForm!: FormGroup;
  companyDDdetails: any = [];
  companydetails: any = [];
  allEmpDetails: any =[];
  Submit: boolean=true;
  id: any;
  show : boolean=false;
  show1: boolean=false;
  errorshow:boolean=false;
  btncondition:boolean=false;
  empid:any; 
  isEditEmployee: boolean=false;
  projectDDdetails:any = [];
  

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
    this.getCompanyDetailsForDropdown();
    this.getAllProjectDetails();

  }
  
  onSubmit(){
    if(this.isEditEmployee == false)
    {
    if (this.EmployeeForm.invalid)
    {
      this.errorshow=true;
      return;
    }
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

    this.getAllEmployee();
  }
  else{
    let ModifiedEmployee:EditemployeeModule = {
      Id: this.id,
      FirstName: this.EmployeeForm.value.firstname,
      LastName: this.EmployeeForm.value.lastname,
      Email: this.EmployeeForm.value.email,
      Phone: this.EmployeeForm.value.phone,
      DateModified: this.EmployeeForm.value.datemodified
    };
    console.log(ModifiedEmployee);

    this.authenticationService.editEmployee(ModifiedEmployee)
    .subscribe(
      (data : any) => {
        this.show = true;
        this.getAllEmployee();
      }
    )
  }

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
   
    this.authenticationService.getEmployeeById(empId)
    .subscribe(
      (data:any)=>{
        console.log(data);
        debugger
        this.EmployeeForm = this.formBuilder.group({
          companyId:[data.companyId, ''],
          
          projectId:[data.projectId, ''],
          firstname:[data.firstName, ''],
          lastname:[data.lastName, ''],
          gender:[data.gender, ''],
          phone:[data.phone, ''],
          email:[data.email, ''],
          datecreated:[data.dateCreated, ''],
          datemodified:[data.dateModified, '']
        });
        this.id=data.id;
        this.isEditEmployee = true;
      })
  }

  deleteAlert(empId:any){
    this.empid=empId;
    this.show1=true;
  }
  deletemethod(){
    this.btncondition=true;
  }

  delete(){
    this.authenticationService.deleteEmployeeDetails(this.empid)
    .subscribe(
      (data : any) => {
        data;
        this.closePopup1();
      })
  }

  closePopup()
  {
    this.show = !this.show;
    this.clearForm();
    this.getAllEmployee();
  }
  closePopup1()
  {
    this.show1 = !this.show1;
    this.getAllEmployee();
  }


  getCompanyDetailsForDropdown(){
    this.authenticationService.getCompanyDetails()
    .subscribe(
      (data : any) => {
        this.companyDDdetails = data;
      }
    )
  }

  closeErrorPopup(){

  }

  getCompDetailsById(compId:any){
    this.authenticationService.getCompanyDetailsById(compId)
    .subscribe(
      (data : any) => {
        this.companydetails = data;
      }
    )

  }
  getAllProjectDetails(){
    this.authenticationService.getProjectDetails()
    .subscribe(
      (data : any) => {
        this.projectDDdetails = data;        
      })
  }
}
