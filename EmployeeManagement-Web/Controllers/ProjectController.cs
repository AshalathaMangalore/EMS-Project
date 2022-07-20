using EmployeeManagement.Models.Models;
using EmployeeManagement_Business;
using EmployeeManagement_Repository.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EmployeeManagement_Web.Controllers
{
    [ApiController]
    [Route("project")]
    public class ProjectController : Controller
    {
        private readonly ProjectBusiness projectBusiness;

        public ProjectController()
        {
            this.projectBusiness = new ProjectBusiness();
        }

        [HttpPost("SaveProject")]
        public async Task<HttpStatusCode> SaveProject(ProjectModel project)
        {
            return await projectBusiness.SaveProject(project);
        }

        [HttpGet("GetAllprojects")]

        public async Task<List<ProjectModel>> GetAllprojects()
        {
            return await projectBusiness.GetAllProjectAsync();
        }

        [HttpGet("GetProjectByID")]

        public async Task<IActionResult> GetProjectByID(int projectID)
        {
            var project = await projectBusiness.GetProjectByIDAsync(projectID);
            
            if(project != null)
            {
                return Ok(project);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("GetProjectByProjID")]
        public async Task<List<ProjectModel>> GetProjectsByProjID(int projId)
        {
            var projects = await projectBusiness.GetProjectsByProjID(projId);
            return projects;
        }


     
    }
}
