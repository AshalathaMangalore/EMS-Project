using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement_Web.Controllers
{
    [Authorize]
    [ApiController]
    public abstract class ApiBaseController : Controller
    {

    }
}
