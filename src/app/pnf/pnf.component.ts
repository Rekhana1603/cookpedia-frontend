import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pnf',
  standalone: true,
  imports: [],
  templateUrl: './pnf.component.html',
  styleUrl: './pnf.component.css'
})
export class PnfComponent {

  constructor(private router:Router){}

  redirect(){
    this.router.navigate(['/']);
  }
}
