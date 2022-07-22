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
  projectid: any;
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
      else{
        const projectId = this.projectid;
        const projectname = this.ProjectForm.value.projectname;
        const projectdescription = this.ProjectForm.value.projectdescription;
        
        this.authenticationService.EditProject( projectId,projectname,projectdescription)
      .subscribe(
        (data : any) => {
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
  }

  EditProject(ProjectId:any){
   
    this.authenticationService.getProjectDetailsByProjId(ProjectId)
    .subscribe(
      (data:any)=>{
        console.log(data);
        debugger
        this.ProjectForm = this.formBuilder.group({
          projectname:[data[0].projectName, ''],
          projectdescription:[data[0].projectDesc, '']
          
        });
        this.projectid=data[0].projectId;
        this.Submit = false;
        this.EditCheck = true;
      })
  }



  }



