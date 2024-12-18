import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string = "https://cdn-icons-png.flaticon.com/512/72/72737.png"

  allUserDownloadList:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getUserDownloads(){
    this.api.getUserDownloadRecipeAPI().subscribe((res:any)=>{
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
    }
  }

  updateProfile(){
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated Successfully!!!")
    })
  }
}

