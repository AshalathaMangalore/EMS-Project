import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { CompanyURLConstants, EmployeeURLConstants, LoginURLConstants, USERURLConstants } from "src/app/shared/constants/url-constant";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthModel } from "src/app/login/models/login.model";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthModel>;
    public currentUser: Observable<AuthModel>;
    constructor(private http: HttpClient, private router: Router) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.currentUserSubject = new BehaviorSubject<AuthModel>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    login(username: string, password: string) {
        debugger;
        var loginmodel={
            UserEmail:username,
            UserPassword:password
        }
        return this.http.post<any>(LoginURLConstants.LOGIN,loginmodel)
            .pipe(map(user => {
            debugger
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                //return user;
            }));
    }
    SaveCompany(companyname: string, companyPhone: string,companyAddress: string){
        var companyModel={
            CompanyId:0,
            CompanyName:companyname,
            CompanyPhone:companyPhone,
            CompanyAddress:companyAddress
        }
        return this.http.post<any>(CompanyURLConstants.SAVECOMPANY,companyModel)
            .pipe(map(company => {
            debugger
            }));
    }
    getCompanyDetails(){
        return this.http.get<any>(CompanyURLConstants.GETALLCOMPANY)
            .pipe(map(company => {
            return company;
            }));
    }

    getEmpDetails(){
        debugger;
        return this.http.get<any>(EmployeeURLConstants.GETALLEMP)
            .pipe(map(emp => {
                debugger;
            return emp;
            }));
    }

    deleteCompanyDetails(compId: any){
        debugger;
        return this.http.delete<any>(CompanyURLConstants.DELETEALLEMP,{ params: { 'companyId': compId } })
        .pipe(map(emp => {
            debugger;
        return emp;
        }));
        //return this.http.get<User>(UserURLConstants.GET_USER_BY_ID_URL, { params: { 'id': id } })
    }

    getCompanyDetailsById(compId: any){
        debugger;
        return this.http.get<any>(CompanyURLConstants.GETCOMPANYDETAILBYID, { params: { 'companyId': compId }})
        .pipe(map(comp => {
            debugger;
        return comp;
        }));
        //return this.http.get<User>(UserURLConstants.GET_USER_BY_ID_URL, { params: { 'id': id } })
    }

    EditCompany(companyid: any, companyname: string ,companyPhone: string, companyAddress: string){
        var companyModel ={
            CompanyId: companyid,
            CompanyName: companyname,
            CompanyAddress: companyAddress,
            CompanyPhone: companyPhone
        }

        return this.http.put<any>(CompanyURLConstants.UPDATECOMPANY,companyModel)
        .pipe(map(statusCodeDetail => {
        debugger
            return statusCodeDetail;
        }));
    }

    setUserContext(user: AuthModel) {
        this.currentUserSubject.next(user);
    }

    public get currentUserValue(): AuthModel {
        return this.currentUserSubject.value;
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'])
    }
    getEmployeeById(empId:any){
        debugger;
        return this.http.get<any>(EmployeeURLConstants.GETEMPBYID, { params: { 'empId': empId }})
        .pipe(map(emp => {
            debugger;
        return emp;
        }));
    }
    EditEmployee(id:any,firstName:string,lastName:string,phone:string,email:string){
        var employeeModel = {
            Id : id,
            FirstName : firstName,
            LastName : lastName,
            Phone : phone,
            Email : email
        }
        console.log(employeeModel);
        
        return this.http.put<any>(EmployeeURLConstants.UPDATEEMPLOYEE,employeeModel)
        .pipe(map(empDetails => {
            debugger
                return empDetails;
            }));
    }
    

}
