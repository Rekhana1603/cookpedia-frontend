import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-server-hl7t.onrender.com"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  // register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  // login
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  // appendToken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  // related-recipes?cuisine=Pakistani
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  //recipe/674ff561639c95409455bc8d/download
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  //recipe/674ff561639c95409455bc8d/save
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }
  
  // get-save-recipes
  getUserSaveRecipesAPI(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
  }

  // save-recipes/:id/remove
  deleteSaveRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
  }

  // user-downloads
  getUserDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  // user/edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  // all-users
  allUsersAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // download-list
  allDownloadListAPI(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

  // all-feedback
  getAllFeedbackListAPI(){
    return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
  }

  // feedback/674ff561639c95409455bc8d/update?status=Approved
  updateFeedbackAPI(feedbackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`,this.appendToken())
  }

  // all-approve-feedback
  getAllApproveFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-approve-feedback`)
  }

  // add-recipe
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

  // recipe/675bf2db2e25a3a8c23110bb/edit
  updateRecipeAPI(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  // recipe/:id/remove
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
  }

  // getChartData
  getChartData(){
    this.allDownloadListAPI().subscribe((res:any)=>{
      console.log(res);    
      let downloadArrayList:any = []
      let output:any = {}
      res.forEach((item:any)=>{
        // item = {recipeCuisine: "Mexican",count:4}
        let cuisine = item.recipeCuisine // cuisine = Mexican
        let currentCount = item.count // currentCount = 4
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount // output = {Mexican:4}
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
      // code extracting cuisine and its total download count as object and added to an array
      // input : [ {recipeCuisine,count} ]
      // output : [ {name:cuisine,y:totalcount} ]

      // algorithm
      // 1. create an empty array for output, object for storing each array
      // 2. get each array item of res and store its recipeCuisine & count to a variable
      // 3. check recipeCuisine is available in output object, if present then set the value of recipeCuisine key as total existing recipeCuisine value with new count, not present then insert recipeCuisine as key and value as its count
      // 4.push each key from output objet into output array
    })
  }
}
