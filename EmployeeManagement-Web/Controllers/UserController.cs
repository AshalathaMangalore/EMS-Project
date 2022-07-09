using EmployeeManagement.Models.Models;
using EmployeeManagement_Business;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement_Web.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly UserBusiness userBusiness;

        public UserController()
        {
            this.userBusiness = new UserBusiness();
        }

        [HttpPost("Login")]

        public async Task<UserModel> Login(UserModel loginmodel)
        {

            var login = await userBusiness.Login(loginmodel);
            return login;
        }
    }
}
