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
    }
}
