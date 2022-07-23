import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ProjectModel } from 'src/app/login/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  ProjectForm!: FormGroup;
  allProjectDetails: any = [];
  allProjDetails: ProjectModel[] = [];
  show: boolean=false;
  showUpdate: boolean=false;
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
          this.showUpdate = true;
        })
      }
       
  }
  getProjectDetails(){
    debugger
    this.authenticationService.getProjDetails()
    .subscribe(
      (data : any) => {
        this.allProjDetails = data;
      })
  }
  closePopup()
  {
    this.show = !this.show; 
    this.clearForm();
    this.getProjectDetails();
  }

  closeUpdatePopup(){
    this.showUpdate = !this.showUpdate; 
    this.Submit = true;
    this.clearForm();
    this.getProjectDetails();
  }
  clearForm() {
    this.ProjectForm.reset({
          'projectname': '',
          'projectdescription': ''
         });
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

  SearchDetails(val: any){
    debugger;
    if(val!='')
    {
      this.allProjDetails = this.allProjDetails.filter(x=>x.projectName==val || x.projectDesc==val); 
    }else{
      this.getProjectDetails();
    }
  }

}



