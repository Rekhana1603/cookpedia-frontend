import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {
  // create a propert to store array of saved recipes
  allRecipes:any = []
  // apiService dependency inject
  constructor(private api:ApiService){}
    // call the function inside ngOnInit
    ngOnInit(){
      this.getAllSavedRecipes()
    }
  // define a function for call sacerecipe api using api service
  getAllSavedRecipes(){
    this.api.getUserSaveRecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);     
    })
  }

  removeSaveRecipe(id:string){
    this.api.deleteSaveRecipeAPI(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
  }
}
