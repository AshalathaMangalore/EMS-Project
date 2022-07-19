using EmployeeManagement_Business;
using EmployeeManagement_Repository;
using EmployeeManagement_Repository.Entities;
using EmployeeManagement.Models.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EmployeeManagement_Web.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeBuisness employeeBusiness;
        
        public EmployeeController()
        {
            employeeBusiness = new EmployeeBuisness();
        }

        [HttpGet("GetAllEmployee")]
        public async Task<List<Employee>> GetAllEmployee()
        {
             return await employeeBusiness.GetAllEmployeesAsync();
        }
        [HttpGet("GetEmployee")]
        public async Task<IActionResult> GetById(int employeeId)
        {
            var emp = await employeeBusiness.GetEmployeeAsync(employeeId);
            return Ok(emp);
        }
        [HttpPost("SaveEmployee")]
        public async Task<HttpStatusCode> SaveEmployee(Employee employee)
        {
            return await employeeBusiness.SaveEmployeeAsync(employee);
        }
        [HttpPut("UpdateEmployee")]
        public async Task<HttpStatusCode> UpdateEmployee(Employee employee)
        {
            return await employeeBusiness.UpdateEmployeeAsync(employee);
        }
        [HttpDelete("DeleteEmployee")]
        public async Task<IActionResult> DeleteById(int employeeId)
        {
            var emp = await employeeBusiness.DeleteEmployeeAsync(employeeId);
            return Ok(emp);
        }

        [HttpPost("AddEmployeeDetails")]
        public async Task<HttpStatusCode> AddEmployeeDetails(EmployeeModel empModel)
        {
            return await employeeBusiness.AddEmployeeDetails(empModel);
        }

        [HttpGet("GetEmployeesByCompanyId")]
        public async Task<List<EmployeeModel>> GetEmployeesByCompanyId(int companyId)
        {
            return await employeeBusiness.GetEmployeesByCompanyId(companyId);
        }

        [HttpDelete("{compId}")]
        public async Task<HttpStatusCode> DeleteEmployeeByCompanyId(int compId)
        {
            return await employeeBusiness.DeleteEmployeeByCompanyId(compId);
        }

        [HttpGet("GetEmployeesByProjectId")]
        public async Task<List<EmployeeModel>> GetEmployeesByProjectId(int projectId)
        {
            return await employeeBusiness.GetEmployeesByProjectId(projectId);
        }

        [HttpGet("GetAllEmp")]
        public async Task<List<EmployeeModel>> GetAllEmpDetails()
        {
            return await employeeBusiness.GetAllEmpDetails();
        }

        [HttpGet("GetEmployeeById")]
        public async Task<EmployeeModel> GetEmployeeById(int empId)
        {
            return await employeeBusiness.GetEmployeeById(empId);

        }

        [HttpPut("UpdateEmployeeDetails")]
        public async Task<HttpStatusCode> UpdateEmployeeDetails(EmployeeModel employee)
        {
            return await employeeBusiness.UpdateEmployeeDetails(employee);
        }

        [HttpPut("UpdateEmployeeDetailsModel")]
        public async Task<HttpStatusCode> Updateemployeedetails(EmployeeUpdateModel employee)
        {
            return await employeeBusiness.Updateemployeedetails(employee);
        }
    }
}
