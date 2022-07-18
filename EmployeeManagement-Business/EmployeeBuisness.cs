using EmployeeManagement.Models.Models;
using EmployeeManagement_Repository;
using EmployeeManagement_Repository.Entities;
using System.Net;

namespace EmployeeManagement_Business
{
    public class EmployeeBuisness
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly CompanyRepository companyRepository;
        private readonly ProjectRepository projectRepository;
        public EmployeeBuisness()
        {
            this.employeeRepository = new EmployeeRepository();
            this.companyRepository = new CompanyRepository();
            this.projectRepository = new ProjectRepository(); 
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
            
            List<Employee> empDetails = await employeeRepository.GetAllEmployeesAsync();
            CompanyDetail compDetail = await companyRepository.GetById(companyId);
            List<Employee> empSel = empDetails.Where(a => a.CompanyId == companyId).ToList();

            if (empSel.Count != 0)
            {
                for (int i = 0; i < empSel.Count; i++)
                {
                    EmployeeModel empObj = new EmployeeModel();
                    empObj.Id = empSel[i].Id;
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

        public async Task<List<EmployeeModel>> GetAllEmpDetails()
        {
            List<EmployeeModel> empLst = new List<EmployeeModel>();
            List<Employee> empDetails = await employeeRepository.GetAllEmployeesAsync();
            if (empDetails.Count != 0)
            {
                for (int i = 0; i < empDetails.Count; i++)
                {
                    EmployeeModel empObj = new EmployeeModel();
                    empObj.Id = empDetails[i].Id;
                    CompanyDetail compDetail = await companyRepository.GetById(empDetails[i].CompanyId);
                    ProjectDetail projDetail = await projectRepository.GetByProjectId(empDetails[i].CompanyId);
                    empObj.CompanyName = compDetail.CompanyName;
                    empObj.ProjectName = projDetail.ProjectName;
                    empObj.FirstName = empDetails[i].FirstName;
                    empObj.LastName = empDetails[i].LastName;
                    empObj.Gender = empDetails[i].Gender;
                    empObj.Phone = empDetails[i].Phone;
                    empObj.Email = empDetails[i].Email;
                    empObj.DateCreated = empDetails[i].DateCreated;
                    empObj.DateModified = empDetails[i].DateModified;
                    //empObj.CompanyName = empDetails[i].Company.CompanyName;
                    //empObj.CompanyPhone = empDetails[i].Company.CompanyPhone;
                    empLst.Add(empObj);
                }
                return empLst;
            }
            else
            {
                return null;
            }
        }

        public async Task<EmployeeModel> GetEmployeeById(int id)
        {
            EmployeeModel e = new EmployeeModel();
            Employee emp = await employeeRepository.GetById(id);
            if(emp != null) {
            e.Id = emp.Id;
            e.CompanyId = emp.CompanyId;
            e.ProjectId = emp.ProjectId;
            e.FirstName = emp.FirstName;
            e.LastName = emp.LastName;
            e.Gender = emp.Gender;
            e.Email = emp.Email;
            e.Phone = emp.Phone;
            e.DateCreated = emp.DateCreated;
            e.DateModified = emp.DateModified;
            return e;
            }
            else
            {
                return null;
            }
        }

        public async Task<HttpStatusCode> UpdateEmployeeDetails(EmployeeModel employee)
        {
            Employee emp = new Employee();
            emp.Id = employee.Id;
            emp.CompanyId = employee.CompanyId;
            emp.ProjectId = employee.ProjectId;
            emp.FirstName = employee.FirstName;
            emp.LastName = employee.LastName;
            emp.Gender = employee.Gender;
            emp.Email = employee.Email;
            emp.Phone = employee.Phone;
            emp.DateCreated = employee.DateCreated;
            emp.DateModified = employee.DateModified;
            await employeeRepository.Update(emp);
            return HttpStatusCode.OK;
        }
    }
}