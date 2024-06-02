import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';
import { Category } from '../Models/category';

@Injectable()
export class CategoryService {
  baseUrl = `${environment.apiUrl}/category`

  constructor(private http: HttpClient) { }

  public getCategory(page?: number, itemsPerPage?: number): Observable<PaginationResult<Category[]>> {
    const paginationResult: PaginationResult<Category[]> = new PaginationResult<Category[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Category[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;

      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(vehicle: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/`, vehicle).pipe(take(1));
  }

  public post(vehicle: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/`, vehicle).pipe(take(1));
  }

  public delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

}
