import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';
import { Supplier } from '../Models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = `${environment.apiUrl}/supplier`

  constructor(private http: HttpClient) { }

  public getSupplier(page?: number, itemsPerPage?: number): Observable<PaginationResult<Supplier[]>> {
    const paginationResult: PaginationResult<Supplier[]> = new PaginationResult<Supplier[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Supplier[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;

      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/`, supplier).pipe(take(1));
  }

  public post(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.baseUrl}/`, supplier).pipe(take(1));
  }

  public delete(id: number): Observable<Supplier> {
    return this.http.delete<Supplier>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

}
