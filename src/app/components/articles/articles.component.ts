import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'

import { ArticleModel } from "../../Models/article.model";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ]
})
export class ArticlesComponent implements OnInit {

  form: FormGroup;

  articles: ArticleModel[] = [];
  currentArticle: ArticleModel = {id: null, name: '', description:'', state:'', date:new Date()};

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
      this.articles = response;
    });
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentArticle.name,
      description: this.currentArticle.description,
      state: this.currentArticle.state,
      date: new Date(this.currentArticle.date)
    });
  }

  addArticle() {
    this.currentArticle ={id: null, name: '', description: '', state: '', date: new Date()};
    this.updateForm();
  }

  createArticle() {
    const newArticle: ArticleModel = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      state: this.form.get('state').value,
      date: this.form.get('date').value,
    };
    this.server.createArticle(newArticle).then( () => {
      this.getArticles();
    });
  }

  editArticle( index ) {
    this.currentArticle = this.articles[index];
    this.updateForm();
  }

  updateArticle() {
    const articleData: ArticleModel = {
      id: this.currentArticle.id,
      name: this.currentArticle.name,
      description: this.currentArticle.description,
    };
    this.server.updateArticle(articleData).then( () => {
      this.getArticles();
    });
  }

  updateState(index, val) {
    this.articles[index].state = val;
    this.server.updateArticle(this.articles[index]).then( ()=> {
      this.getArticles;
    });
  }

  deleteArticle( index) {
    this.server.deleteArticle( this.articles[index] ).then(() => {
      this.getArticles();
    });
  }

}
