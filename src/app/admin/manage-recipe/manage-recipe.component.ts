import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !:string
  recipeDetails:RecipeModel = {}
  cuisineArray:any = []
  mealTypeArray:any = []
  ingredients:any = []
  instructions:any = []
  mealArray:any = []

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
      res.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);
      const dummyMeal = res.map((item:any)=>item.mealType)
      // console.log(dummyMeal.flat(Infinity));
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);  
    })
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value = ""
      console.log(this.ingredients);
      
    }
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstructions(instructionInput:any){
    if(instructionInput.value){
      this.instructions.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructions);    
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  mealTypeSelect(event:any){
    if(event.target.checked){
      !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
    }else{
      this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealArray);
  }

  removeMealType(meal:string){
    this.mealArray = this.mealArray.filter((item:string)=>item!=meal)
  }

  addRecipe(){
    console.log(this.recipeDetails);  
    // 1. add ingredients , instructions and mealArray to recipeDetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    // 2. check all fields have values in recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
          // 3. If all values are present make api call
          this.api.addRecipeAPI(this.recipeDetails).subscribe({
            next:(res:any)=>{
              // - if api call success then clear all fileds, alert "recipe added", redirect to all recipe page 
              alert("Recipe successfully added to our collection!!!")
              this.recipeDetails = {}
              this.ingredients = []
              this.instructions = []
              this.mealArray = []
              this.router.navigateByUrl("/admin/recipe-list")
            }
          })
          error:(reason:any)=>{
            //  - if api call failed then alert failed msg, clear name field of recipeDetails
            alert(reason.error)
            this.recipeDetails.name = ""
          }
    }else{
    // 4. if all values are not present then alert "fill the form"
    alert("Please fill the form completely!!!")
    }
  }

  editRecipe(){
    console.log(this.recipeDetails);  
    // 1. add ingredients , instructions and mealArray to recipeDetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    // 2. check all fields have values in recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){  
    // 3. If all values are present make api call
    this.api.updateRecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>{
        // - if api call success then clear all fileds, alert "recipe added", redirect to all recipe page 
        alert("Recipe details successfully updated!!!")
        this.recipeDetails = {}
        this.ingredients = []
        this.instructions = []
        this.mealArray = []
        this.router.navigateByUrl("/admin/recipe-list")

    })
    }else{
    // 4. if all values are not present then alert "fill the form"
    alert("Please fill the form completely!!!")
    }
  }

}
