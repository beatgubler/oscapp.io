import { environment } from '../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  serverUrl = environment.serverUrl
  posts
  user
  userId
  data = {"userId": null, "content": null, "username": null}
  scroll = true
  test = 500

  constructor(private _chatService: ChatService, public _auth: AuthService, private _router: Router, private _route: ActivatedRoute) {  }

  @ViewChild("chat") chat: ElementRef

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.test = event.target.innerHeight-130;
  }

  ngAfterViewChecked() {
    if (this.scroll == true){
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight
    }
  } 

  ngOnInit() {    
    this._auth.user.subscribe(user => this.user = user)
    this._auth.userId.subscribe(userId => this.userId = userId)
    
    this.getPosts()
    
    this._chatService.getMessages().subscribe((message: string) => {
      this.getPosts()
    })

    this.test = window.innerHeight-130;
  }

  toggleAutoScroll(){
    this.scroll = !this.scroll
  }

  sendMessage(form) {
    this.data = {"userId": this.userId, "content": form.value.message, "username": this.user}
    this._chatService.postMessage(this.data)
      .subscribe(
        res => {
          this._chatService.socket.emit('message')
          this.data.content = null
        },
        err => {
          console.log(err)
        }
      )
    
  }

  getPosts() {
    this._chatService.getPosts().subscribe(
      res => {
        this.posts = res
      },
      err => { 
        console.log(err)
      }
    )
  }

  deleteMessage(id){
    if(confirm("Are you sure to delete this post?")) {
      this._chatService.deleteMessage(id).subscribe(
        res => {
          this._chatService.socket.emit('message')
        },
        err => { 
          console.log(err)
        }
      )
    }
  }

}
