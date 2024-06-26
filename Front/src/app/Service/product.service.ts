import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `${environment.apiUrl}/product`

  constructor(private http: HttpClient) { }

  public getProducts(page?: number, itemsPerPage?: number): Observable<PaginationResult<Product[]>> {
    const paginationResult: PaginationResult<Product[]> = new PaginationResult<Product[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Product[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;

      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/`, product).pipe(take(1));
  }

  public post(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/`, product).pipe(take(1));
  }

  public delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
