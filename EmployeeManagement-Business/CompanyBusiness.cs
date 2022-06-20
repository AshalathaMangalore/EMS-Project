using EmployeeManagement.Data.Models;
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
    public class CompanyBusiness
    {
        private readonly CompanyRepository companyRepository;
        public CompanyBusiness()
        {
            this.companyRepository = new CompanyRepository();
        }
        
        public async Task<List<CompanyDetail>> GetAllCompanyAsync()
        {
            return await companyRepository.GetAllCompanyAsync();
        }

        public async Task<CompanyDetail> GetCompanyAsync(int Id)
        {
            var emp = await companyRepository.GetById(Id);
            return emp;
        }

        public async Task<HttpStatusCode> SaveCompanyDetails(CompanyDetail company)
        {
            await companyRepository.Create(company);
            return HttpStatusCode.OK;

        }

        public async Task<HttpStatusCode> UpdateCompanyAsync(CompanyDetail company)
        {
          await companyRepository.Update(company);
          return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> DeleteCompany(int companyId)
        {
            await companyRepository.Delete(companyId);
            return HttpStatusCode.OK;

        }

        public async Task<HttpStatusCode> CreateCompanyDetails(CompanyModel comp)
        {
            CompanyDetail companyDetail = new CompanyDetail();
            companyDetail.CompanyName = comp.CompanyName;
            companyDetail.CompanyAddress = comp.CompanyAddress;
            companyDetail.CompanyPhone = comp.CompanyPhone;
            await companyRepository.CreateCompanyDetails(companyDetail);
            return HttpStatusCode.OK;
        }

    }
}
