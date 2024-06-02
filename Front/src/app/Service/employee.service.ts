import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Employee } from '../Models/employee';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';

@Injectable()
export class EmployeeService {

  baseUrl = `${environment.apiUrl}/employee`

  constructor(private http: HttpClient) { }

  public getEmployees(page?: number, itemsPerPage?: number): Observable<PaginationResult<Employee[]>> {
    const paginationResult: PaginationResult<Employee[]> = new PaginationResult<Employee[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Employee[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;
      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/`, employee).pipe(take(1));
  }

  public post(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/`, employee).pipe(take(1));
  }

  public delete(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
