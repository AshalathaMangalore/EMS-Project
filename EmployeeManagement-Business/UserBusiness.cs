using EmployeeManagement.Models.Models;
using EmployeeManagement_Repository;
using EmployeeManagement_Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement_Business
{
    public class UserBusiness
    {
        private readonly UserRepository userRepository;

        public UserBusiness()
        {
            this.userRepository = new UserRepository();
        }
        public async Task<UserModel> Login(UserModel loginmodel)
        {

            var login = await userRepository.Login(loginmodel.UserEmail, loginmodel.UserPassword);
            UserModel userDetail = new UserModel();
            userDetail.UserEmail = loginmodel.UserEmail;
            userDetail.UserPassword = loginmodel.UserPassword;
           
            return userDetail;
        }

    }
}
