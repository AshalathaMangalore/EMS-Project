import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;
export class LoginURLConstants {
    static LOGIN = apiUrl + '/user/Login';
}
export class USERURLConstants {
    static GETALL = apiUrl + '/user/GetAllUser';
}
export class ProjectURLConstants{
    static GETPROJECTSBYID = apiUrl + '/controller/GetProjectByProjID';
    static SAVEPROJECT = apiUrl + '/project/SaveProject';
    static GETPROJECTS = apiUrl + '/project/GetAllprojects';
}