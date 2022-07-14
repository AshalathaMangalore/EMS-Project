using EmployeeManagement_Business;
using EmployeeManagement_Repository.Entities;
using EmployeeManagement.Models.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace EmployeeManagement_Web.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CompanyController : Controller
    {
        private readonly CompanyBusiness companyBusiness;

        public CompanyController()
        {
            companyBusiness = new CompanyBusiness();
        }

        [HttpGet("GetAllCompany")]
        public async Task<List<CompanyDetail>> GetAllCompany()
        {
            return await companyBusiness.GetAllCompanyAsync();
        }

        [HttpGet("GetByCompany")]
        public async Task<IActionResult> GetById(int companyId)
        {
            var c = Request.Cookies["CompanyDetail"];
            if(c!= null)
            {
                var deserializeData = JsonConvert.DeserializeObject<CompanyDetail>(c);
            }
            var company = await companyBusiness.GetCompanyAsync(companyId);
            var data = JsonConvert.SerializeObject(company);
            Response.Cookies.Append("CompanyDetail",data);
            return Ok(company);
        }

        [HttpPost("AddCompany")]
        public async Task<HttpStatusCode> SaveCompanyDetails(CompanyDetail companyDetail)
        {
            return await companyBusiness.SaveCompanyDetails(companyDetail);
        }

        [HttpPut("Update")]
        public async Task<HttpStatusCode> UpdateCompany(CompanyDetail company)
        {
            return await companyBusiness.UpdateCompanyAsync(company);
        }

        [HttpDelete("DeleteCompanyDetails")]
        public async Task<IActionResult> DeleteCompanyDetails(int companyId)
        {
            var comp = companyBusiness.DeleteCompany(companyId);
            return Ok(comp);
        }

        [HttpPost("Create")]
        public async Task<HttpStatusCode> CreateCompanyDetails(CompanyModel comp)
        {
            return await companyBusiness.CreateCompanyDetails(comp);
        }

        [HttpGet("GetAllCompanyDetails")]
        public async Task<List<CompanyModel>> GetAllCompanyDetails()
        {
            return await companyBusiness.GetAllCompanyDetails();
        }

        [HttpGet("GetCompanyById")]
        public async Task<CompanyModel> GetCompanyById(int companyId)
        {
            return await companyBusiness.GetCompanyById(companyId);
          
        }

        
        [HttpPut("UpdateCompanyDetails")]
        public async Task<HttpStatusCode> UpdateCompanyDetails(CompanyModel company)
        {
            return await companyBusiness.UpdateCompanyDetails(company);
        }

    }

}
