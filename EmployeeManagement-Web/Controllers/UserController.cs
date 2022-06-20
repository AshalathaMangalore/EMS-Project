using EmployeeManagement.Data.Models;
using EmployeeManagement_Business;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement_Web.Controllers
{
    public class UserController : Controller
    {
        private readonly UserBusiness userBusiness;

        public UserController()
        {
            this.userBusiness = new UserBusiness();
        }

        public async Task<UserModel> Login(UserModel loginmodel)
        {

            var login = await userBusiness.Login(loginmodel);
            return login;
        }
    }
}
