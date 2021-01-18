import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ]
})
export class ArticlesComponent implements OnInit {

  form: FormGroup;

  articles: any[] = [];
  currentArticle: any = {id: null, name: '', description:'', state:'', date:new Date()};

  constructor(  private formBuildeer: FormBuilder,
                private server: ServerService) { }

  ngOnInit(): void {
    this.form =this.formBuildeer.group({
      name: [this.currentArticle.name, Validators.required],
      description: this.currentArticle,
      state: this.currentArticle,
      date: [this.currentArticle, Validators.required]
    });
    this.getArticles();
  }

  private getArticles(){
    this.server.getArticles().then((response: any) => {
      console.log('Response', response);
      this.articles = response.map((ar) => {
        return ar;
      });
    });
  }

}
