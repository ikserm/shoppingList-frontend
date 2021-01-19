import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServerService } from "../../services/server.service";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ArticleModel } from "../../Models/article.model";
form: FormGroup;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ]
})
export class ArticlesComponent implements OnInit {

  form: FormGroup;
  modalRef: BsModalRef;

  articles: ArticleModel[] = [];
  currentArticle: ArticleModel = {id: null, name: '', description:'', state:'', date:new Date()};
  modalCallback: () => void;

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
    this.server.getArticles().then((response: ArticleModel[]) => {
      console.log('Response', response);
      this.articles = response;
    });
  }

  setCurrentArticle(index) {
      this.currentArticle = JSON.parse( JSON.stringify( this.articles[index] ) );
  }

  clearCurrentArticle() {
    this.currentArticle.id=null;
    this.currentArticle.name="";
    this.currentArticle.description="";
    this.currentArticle.state="";
    this.currentArticle.date=null;
  }

  save( form: NgForm){
    if ( form.valid == false){
      console.log('Form no valid');
      return;
    };

    if ( this.currentArticle.id==null){
      console.log("new article");
      console.log(this.currentArticle)
      this.server.createArticle( this.currentArticle ).then( ()=>{
        this.getArticles();
      });
    }else{
      console.log("update article")
      this.server.updateArticle( this.currentArticle ).then( ()=>{
        this.getArticles;
      });
    }

  }

  updateState(index, val) {
    this.articles[index].state = val;
    this.server.updateArticle(this.articles[index]).then( ()=> {
      this.getArticles;
    });
  }

  deleteArticle( ) {

    this.server.deleteArticle( this.currentArticle ).then(() => {
      this.getArticles();
    });
  }



  onCancel() {
    this.modalRef.hide();
  }





}
