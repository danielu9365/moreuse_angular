import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  name: string | undefined | null;

  ngOnInit(): void {
    var token = localStorage.getItem('token')
    var headers;
    if (token) {

      headers = new HttpHeaders().set('authorization', 'Bearer ' + token);
    }
    const options = { headers: headers };
    this.http.get('https://run.mocky.io/v3/a8c2acbd-9623-4f26-bbd5-9106f53a3851', options).subscribe({
      next: (response: any) => {
        this.name = response.name;
      },
      error: (e) => console.error(e),
      complete: () => console.info('usuario obtenido')
    })
  }

}
