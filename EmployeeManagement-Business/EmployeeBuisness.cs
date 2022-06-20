using EmployeeManagement.Data.Models;
using EmployeeManagement_Repository;
using EmployeeManagement_Repository.Entities;
using System.Net;

namespace EmployeeManagement_Business
{
    public class EmployeeBuisness
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly CompanyRepository companyRepository;
        public EmployeeBuisness()
        {
            this.employeeRepository = new EmployeeRepository();
            this.companyRepository = new CompanyRepository();
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await employeeRepository.GetAllEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeAsync(int Id)
        {
            var emp = await employeeRepository.GetById(Id);
            return emp;

        }
        public async Task<HttpStatusCode> SaveEmployeeAsync(Employee employee)
        {
            await employeeRepository.Create(employee);
            return HttpStatusCode.OK;

        }
        public async Task<HttpStatusCode> UpdateEmployeeAsync(Employee employee)
        {
            await employeeRepository.Update(employee);
            return HttpStatusCode.OK;

        }
        public async Task<HttpStatusCode> DeleteEmployeeAsync(int Id)
        {
            await employeeRepository.Delete(Id);
            return HttpStatusCode.OK;
        }
        public async Task<HttpStatusCode> AddEmployeeDetails(EmployeeModel empModel)
        {
            Employee emp = new Employee();
            var e = await companyRepository.GetById(empModel.CompanyId);
            if (e!= null)
            {
                emp.CompanyId = empModel.CompanyId;
                emp.ProjectId = empModel.ProjectId;
                emp.FirstName = empModel.FirstName;
                emp.LastName = empModel.LastName;
                emp.Gender = empModel.Gender;
                emp.Phone = empModel.Phone;
                emp.Email = empModel.Email;
                emp.DateCreated = empModel.DateCreated;
                emp.DateModified = empModel.DateModified;

                await employeeRepository.AddEmployeeDetails(emp);
                return HttpStatusCode.OK;
            }
            else
            {
                return HttpStatusCode.BadRequest;
            }

        }

        public async Task<List<EmployeeModel>> GetEmployeesByCompanyId(int companyId)
        {
            List<EmployeeModel> empLst = new List<EmployeeModel>();
            EmployeeModel empObj = new EmployeeModel();
            List<Employee> empDetails = await employeeRepository.GetAllEmployeesAsync();
            CompanyDetail compDetail = await companyRepository.GetById(companyId);
            List<Employee> empSel = empDetails.Where(a => a.CompanyId == companyId).ToList();

            if (empSel.Count != 0)
            {
                for (int i = 0; i < empSel.Count; i++)
                {
                    empObj.CompanyId = empSel[i].CompanyId;
                    empObj.ProjectId = empSel[i].ProjectId;
                    empObj.FirstName = empSel[i].FirstName;
                    empObj.LastName = empSel[i].LastName;
                    empObj.Gender = empSel[i].Gender;
                    empObj.Phone = empSel[i].Phone;
                    empObj.Email = empSel[i].Email;
                    empObj.DateCreated = empSel[i].DateCreated;
                    empObj.DateModified = empSel[i].DateModified;
                    empObj.CompanyName = compDetail.CompanyName;
                    empObj.CompanyPhone = compDetail.CompanyPhone;
                    empLst.Add(empObj);
                }
                return empLst;
            }
            else
            {
                return null;
            }

        }

        public async Task<HttpStatusCode> DeleteEmployeeByCompanyId(int compId)
        {
            List<Employee> empDetails = await employeeRepository.GetAllEmployeesAsync();
            List<Employee> empSel = empDetails.Where(a => a.CompanyId == compId).ToList();
            if(empSel.Count != 0)
            {
                foreach (Employee emp in empSel)
                {
                    await employeeRepository.Delete(emp.Id);
                }
                return HttpStatusCode.OK;
            }
            else
            {
                return HttpStatusCode.BadRequest;
            }
        }

        public async Task<List<EmployeeModel>> GetEmployeesByProjectId(int projectId)
        {
            List<EmployeeModel> empList = new List<EmployeeModel>();
            EmployeeModel emp;
            List<Employee> empDetails = await employeeRepository.GetAllEmployeesAsync();
            List<Employee> empSel = empDetails.Where(a => a.ProjectId == projectId).ToList();
            if(empSel.Count != 0)
            {
                foreach(Employee empsel in empSel)
                {
                    emp = new EmployeeModel();
                    emp.Id = empsel.Id;
                    emp.ProjectId = empsel.ProjectId;
                    emp.CompanyId = empsel.CompanyId;
                    emp.FirstName = empsel.FirstName;
                    emp.LastName = empsel.LastName;
                    emp.Gender = empsel.Gender;
                    emp.Phone = empsel.Phone;
                    emp.Email = empsel.Email;
                    emp.DateCreated = empsel.DateCreated;
                    emp.DateModified = empsel.DateModified;
                    empList.Add(emp);
                }
                return empList;
            }
            else
            {
                return null;
            }
        }
    }
}