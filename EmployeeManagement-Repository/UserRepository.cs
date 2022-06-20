using EmployeeManagement_Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement_Repository
{
    public class UserRepository
    {

        private readonly EmployeeManagementContext dbContext;
        public UserRepository()
        {
            this.dbContext = new EmployeeManagementContext();
        }

        public async Task<UserDetail> Login(string userEmail, string password)
        {
            var user = dbContext.UserDetails.SingleOrDefault(x => x.UserEmail == userEmail && x.UserPassword == password);
            if (user != null)
            {
                return user;
            }
            else
            {
                return user;
            }
        }
    }
}
