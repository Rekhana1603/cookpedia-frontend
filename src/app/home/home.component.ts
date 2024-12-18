import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any = []
  allFeedbackList:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllRecipes()
    this.getAllApprovedFeedback()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
      
    })
  }

  getAllApprovedFeedback(){
    this.api.getAllApproveFeedbackAPI().subscribe((res:any)=>{
      this.allFeedbackList = res
      console.log(this.allFeedbackList);
      
    })
  }
}
