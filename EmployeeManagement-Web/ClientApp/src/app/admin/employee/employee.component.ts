import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService) { }
  allEmpDetails: any =[];
  EmployeeForm!:FormGroup;
  show: boolean=false;
  id:any;
  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      phone : ["", Validators.required],
      email : ["", Validators.required]
    })

    this.getAllEmployee();

  }

  onSubmit(){
    if (this.EmployeeForm.invalid)
      return;
      const id = this.id;
      const firstName = this.EmployeeForm.value.firstName;
      const lastName = this.EmployeeForm.value.lastName;
      const phone = this.EmployeeForm.value.phone;
      const email = this.EmployeeForm.value.email;
      

      this.authenticationService.EditEmployee(id,firstName,lastName,phone,email)
      .subscribe(
        (data:any)=>{
          debugger;
          this.show = true;
        }
      )
  }

  

  getAllEmployee(){
    this.authenticationService.getEmpDetails()
    .subscribe(
      (data : any) => {
        debugger;
        this.allEmpDetails = data;
      })
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

  clearForm() {
    this.EmployeeForm.reset({
          'firstName': '',
          'lastName': '',
          'phone': '',
          'email':''
         });
    }
}
