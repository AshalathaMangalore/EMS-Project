import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { CompanyURLConstants, EmployeeURLConstants, LoginURLConstants, USERURLConstants } from "src/app/shared/constants/url-constant";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthModel } from "src/app/login/models/login.model";
import { EmployeeModel } from "src/app/login/models/employee/employee.module";
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
        var loginmodel={
            UserEmail:username,
            UserPassword:password
        }
        return this.http.post<any>(LoginURLConstants.LOGIN,loginmodel)
            .pipe(map(user => {
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
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                //return user;
            }));
    }
    getCompanyDetails(){
        return this.http.get<any>(CompanyURLConstants.GETALLCOMPANY)
            .pipe(map(company => {
            return company;
            }));
    }
    getEmpDetails(){
        return this.http.get<any>(EmployeeURLConstants.GETALLEMP)
            .pipe(map(emp => {
            return emp;
            }));
    }
    deleteCompanyDetails(compId: any){
        return this.http.delete<any>(CompanyURLConstants.DELETEALLEMP,{ params: { 'companyId': compId } })
        .pipe(map(cmp => {
        return cmp;
        }));
    }
    deleteEmployeeDetails(empId: any){
        return this.http.delete<any>(EmployeeURLConstants.DELETEALLEMP,{ params: { 'employeeId': empId } })
        .pipe(map(emp => {
        return emp;
        }));
    }
    getCompanyDetailsById(compId: any){
        return this.http.get<any>(CompanyURLConstants.GETCOMPANYDETAILBYID, { params: { 'companyId': compId }})
        .pipe(map(comp => {  
        return comp;
        }));
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
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
        this.router.navigate(['/login'])
    }

    SaveEmployee(newEmployee:EmployeeModel){
        
        return this.http.post<any>(EmployeeURLConstants.SAVEEMPLOYEE,newEmployee)
            .pipe(map(status => {
                debugger
                return status;
                

            }));
    }
    

}
