using EmployeeManagement.Models.Models;
using EmployeeManagement_Repository;
using EmployeeManagement_Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement_Business
{
    public class ProjectBusiness
    {
        private readonly ProjectRepository projectRepository;

        public ProjectBusiness()
        {
            this.projectRepository = new ProjectRepository();
            projectRepository = new ProjectRepository();
        }

        public async Task<HttpStatusCode> SaveProject(ProjectModel project)
        {
            ProjectDetail projectDetail = new ProjectDetail();
            if (project != null)
            {
                projectDetail.ProjectName = project.ProjectName;
                projectDetail.ProjectDesc = project.ProjectDesc;
                await projectRepository.CreateProject(projectDetail);
                return HttpStatusCode.OK;
            }
            else
            {
                
                return HttpStatusCode.BadRequest;
            }
        }
        public async Task<List<ProjectModel>> GetAllProjectAsync()
        {
            List<ProjectDetail> pd = new List<ProjectDetail>();
            List<ProjectModel> projectList = new List<ProjectModel>();
            pd = await projectRepository.GetAllProject();
            foreach (var item in pd)
            {
                ProjectModel md = new ProjectModel();
                md.ProjectId = item.ProjectId;
                md.ProjectName = item.ProjectName;
                md.ProjectDesc = item.ProjectDesc;
                projectList.Add(md);
            }
            return projectList;
        }

        public async Task<ProjectDetail> GetProjectByIDAsync(int id)
        {
              
            var project = await projectRepository.GetByProjectId(id);
            return project;
       
        }
        
    }
}
