import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;
export class LoginURLConstants {
    static LOGIN = apiUrl + '/user/Login';
}
export class USERURLConstants {
    static GETALL = apiUrl + '/user/GetAllUser';
}
export class CompanyURLConstants {
    static SAVECOMPANY = apiUrl + '/company/Create';
    static GETALLCOMPANY = apiUrl + '/company/GetAllCompanyDetails';
    static DELETEALLEMP = apiUrl + '/company/DeleteCompanyDetails';
    static GETCOMPANYDETAILBYID = apiUrl + '/company/GetCompanyById';
    static UPDATECOMPANY = apiUrl + '/company/UpdateCompanyDetails';
}

export class EmployeeURLConstants{
    static GETALLEMP = apiUrl + '/employee/GetAllEmp';
    static GETEMPBYID = apiUrl + '/employee/GetEmployeeById';
    static UPDATEEMPLOYEE = apiUrl + '/employee/UpdateEmployeeDetails';
    static DELETEALLEMP = apiUrl + '/employee/DeleteEmployee';
    static SAVEEMPLOYEE = apiUrl + '/employee/AddEmployeeDetails';
    static GETEMPBYCOMPID = apiUrl + '/employee/GetEmployeesByCompanyId';
}

export class ProjectURLConstants{
    static GETPROJECTSBYID = apiUrl + '/project/GetProjectByProjID';
    static GETALLPROJECT = apiUrl + '/project/GetAllprojects';
    static SAVEPROJECT = apiUrl + '/project/SaveProject';
    static GETPROJECTS = apiUrl + '/project/GetAllprojects';
}

