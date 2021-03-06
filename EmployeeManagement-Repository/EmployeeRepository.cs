using EmployeeManagement_Repository.Entities;

namespace EmployeeManagement_Repository
{
    public class EmployeeRepository
    {
        private readonly EmployeeManagementContext dbContext;
        public EmployeeRepository()
        {
            this.dbContext = new EmployeeManagementContext();
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return dbContext.Employees.ToList();
        }

        public async Task Create(Employee employee)
        {
            dbContext.Employees.Add(employee);
            await dbContext.SaveChangesAsync();
        }

        public async Task Update(Employee employee)
        {
            var existingEmployee = dbContext.Employees.Where(h => h.Id == employee.Id).FirstOrDefault();
            if (existingEmployee != null)
            {
                existingEmployee.FirstName = employee.FirstName; // update only changeable properties
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Phone = employee.Phone;
                existingEmployee.Email = employee.Email;
                existingEmployee.DateModified = employee.DateModified;
                await this.dbContext.SaveChangesAsync();
            }
        }

        public async Task<Employee> GetById(int Id)
        {
            var employee = dbContext.Employees.FirstOrDefault(e => e.Id == Id);
            return employee;
        }

        public async Task Delete(int employeeId)
        {
            var employee = await GetById(employeeId);
            if (employee != null)
            {
                dbContext.Employees.Remove(employee);
                await this.dbContext.SaveChangesAsync();
            }
        }

        public async Task AddEmployeeDetails(Employee employee)
        {
            dbContext.Employees.Add(employee);
            await dbContext.SaveChangesAsync();
        }

    }
}