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
            try
            {
                await companyRepository.Delete(companyId);
                return HttpStatusCode.OK;
            }
            catch (Exception e)
            {
                return HttpStatusCode.BadRequest;
            }

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

        public async Task<List<CompanyModel>> GetAllCompanyDetails()
        {
            List<CompanyModel> lstCompDetails = new List<CompanyModel>();

            List<CompanyDetail> companyDetail = new List<CompanyDetail>();
            companyDetail =  await companyRepository.GetAllCompanyAsync();
            foreach(var comp in companyDetail)
            {
                CompanyModel c = new CompanyModel();
                c.CompanyId = comp.CompanyId;
                c.CompanyName = comp.CompanyName;
                c.CompanyAddress = comp.CompanyAddress;
                c.CompanyPhone = comp.CompanyPhone;
                lstCompDetails.Add(c);
            }
            return lstCompDetails;
        }
        public async Task<CompanyModel> GetCompanyById(int Id)
        {
            CompanyModel c = new CompanyModel();
            
            CompanyDetail comp = await companyRepository.GetById(Id);
            c.CompanyId = comp.CompanyId;
            c.CompanyName = comp.CompanyName;
            c.CompanyAddress = comp.CompanyAddress;
            c.CompanyPhone = comp.CompanyPhone;
            return c;
        }

        public async Task<HttpStatusCode> UpdateCompanyDetails(CompanyModel company)
        {
            CompanyDetail compDetail = new CompanyDetail();
            compDetail.CompanyId = company.CompanyId;
            compDetail.CompanyPhone = company.CompanyPhone;
            compDetail.CompanyName = company.CompanyName;
            compDetail.CompanyAddress = company.CompanyAddress;
            await companyRepository.Update(compDetail);
            return HttpStatusCode.OK;
        }

    }
}
