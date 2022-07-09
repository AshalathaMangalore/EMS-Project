import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;
export class LoginURLConstants {
    static LOGIN = apiUrl + '/user/Login';
}
export class USERURLConstants {
    static GETALL = apiUrl + '/user/GetAllUser';
}
export class SaveURLCostants {
    static SAVE = apiUrl + '/company/Create'
    static GETALLCOMPANY = apiUrl + '/company/GetAllCompanyDetails'
}
export class EmployeeURLConstants {
    static GETEMP = apiUrl + '/employee/GetAllEmployee'
}
export class CompanyURLConstants {
    static DELCOMP = apiUrl + '/company/DeleteCompanyDetails/'
}
