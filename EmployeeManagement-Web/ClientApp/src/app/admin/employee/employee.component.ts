import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  allEmpDetails: any =[];
  show: boolean = false
  ngOnInit(): void {
    this.getAllEmployee();

  }

  getAllEmployee(){
    this.authenticationService.getEmpDetails()
    .subscribe(
      (data : any) => {
        debugger;
        this.allEmpDetails = data;
        
      })
  }
  delete(empId: any){
    this.authenticationService.deleteEmployeeDetails(empId)
    .subscribe(
      (data : any) => {
        debugger;
        data;
        this.show = true
      
        //this.allCompanyDetails = data;
      })
      this.getAllEmployee();
  }
  closePopup()
  {
    this.show = !this.show;
    
  }
}
