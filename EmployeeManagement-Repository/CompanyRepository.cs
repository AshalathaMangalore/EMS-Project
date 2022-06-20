using EmployeeManagement_Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement_Repository
{
    public class CompanyRepository
    {
        private readonly EmployeeManagementContext dbContext;
        public CompanyRepository()
        {
            this.dbContext = new EmployeeManagementContext();
        }

        public async Task<List<CompanyDetail>> GetAllCompanyAsync()
        {
            return dbContext.CompanyDetails.ToList();
        }
        public async Task<CompanyDetail> GetById(int Id)
        {
            var company = dbContext.CompanyDetails.FirstOrDefault(e => e.CompanyId == Id);
            return company;
        }

        public async Task Create(CompanyDetail company)
        {
            dbContext.CompanyDetails.Add(company);
            await dbContext.SaveChangesAsync();
        }

        public async Task Update(CompanyDetail company)
        {
            var existingCompany = dbContext.CompanyDetails.Where(x => x.CompanyId == company.CompanyId).FirstOrDefault();
            
            if (existingCompany != null)
            {
                existingCompany.CompanyName = company.CompanyName; 
                existingCompany.CompanyPhone = company.CompanyPhone;
                await this.dbContext.SaveChangesAsync();
            }
        }

        public async Task Delete(int companyId)
        {
            var comp = dbContext.CompanyDetails.FirstOrDefault(x => x.CompanyId == companyId);
            if (comp != null)
            {
                dbContext.CompanyDetails.Remove(comp);
                await dbContext.SaveChangesAsync();
            }

        }

        public async Task CreateCompanyDetails(CompanyDetail company)
        {
            dbContext.CompanyDetails.Add(company);
            await dbContext.SaveChangesAsync();
        }

    }
}