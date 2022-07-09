import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { CompanyURLConstants, EmployeeURLConstants, LoginURLConstants, SaveURLCostants, USERURLConstants } from "src/app/shared/constants/url-constant";
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
        var loginmodel={
            UserEmail:username,
            UserPassword:password
        }
        return this.http.post<any>(LoginURLConstants.LOGIN,loginmodel)
            .pipe(map(user => {
            debugger
                localStorage.setItem('currentUser', JSON.stringify(user));
                
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
    AddCompany(companyName: string, companyAddress: string, companyPhone: string ){
        var companyModel={
            companyId:0,
            CompanyName: companyName,
            CompanyAddress: companyAddress,
            CompanyPhone: companyPhone
        }
        return this.http.post<any>(SaveURLCostants.SAVE,companyModel)
            .pipe(map(company => {
            debugger
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(company));
                //return user;
            }));
    }

    getCompanyDetails(){
        return this.http.get<any>(SaveURLCostants.GETALLCOMPANY)
            .pipe(map(company => {
                return company;
            }));

    }

  

    getAllEmployee(){        
        return this.http.get<any>(EmployeeURLConstants.GETEMP)
            .pipe(map(employee => {
                return employee;
            }));
        }

    deleteCompanyDetails(compId : any){
        debugger
        return this.http.delete<any>(CompanyURLConstants.DELCOMP + compId)
            .pipe(map(company => {
                debugger
           
            }));
    
    }

}