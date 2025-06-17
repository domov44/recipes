import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/button/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Button, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  private http = inject(HttpClient);
  data$: Observable<any> = this.http.get<any>(
  'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
);
}
