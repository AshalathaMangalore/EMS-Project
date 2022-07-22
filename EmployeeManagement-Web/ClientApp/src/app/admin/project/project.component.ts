import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  ProjectForm!: FormGroup;
  allProjectDetails: any = [];
  show: boolean=false;
  Submit: boolean=true;
  EditCheck: boolean=false;
  companyId: any;
  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.ProjectForm = this.formBuilder.group({
      projectname: ["", Validators.required],
      projectdescription: ["", Validators.required], 
    });
    this.getProjectDetails();
 
  }
  onSubmit(){
    debugger;
    if(this.EditCheck == false)
    {
    if (this.ProjectForm.invalid)
      return;
      const projectname = this.ProjectForm.value.projectname;
      const projectdescription = this.ProjectForm.value.projectdescription; 
      debugger
        this.authenticationService.SaveProject(projectname, projectdescription)
      .subscribe(
        (data : any) => {
          //this.router.navigate(["/admin"]);
          // if(confirm("Succefully Added Company Details") == true){
          //   this.clearForm();
          // }
          this.show = true;
        })
      }
       
  }
  getProjectDetails(){
    debugger
    this.authenticationService.getProjDetails()
    .subscribe(
      (data : any) => {
        this.allProjectDetails = data;
      })
  }
  closePopup()
  {
    this.show = !this.show; 
    this.clearForm;
    this.getProjectDetails();
  }
  clearForm() {
    this.ProjectForm.reset({
          'projectname': '',
          'projectdescription': ''
         });
    }

  }



