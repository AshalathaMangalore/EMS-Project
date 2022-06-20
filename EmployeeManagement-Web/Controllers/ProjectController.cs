using EmployeeManagement.Models.Models;
using EmployeeManagement_Business;
using EmployeeManagement_Repository.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EmployeeManagement_Web.Controllers
{
    [ApiController]
    [Route("[Controller]")]
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

        public async Task<List<ProjectDetail>> GetAllprojects()
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


    }
}
