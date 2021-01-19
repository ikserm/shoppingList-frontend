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
    this.server.getArticles().then((response: any) => {
      console.log('Response', response);
      this.articles = response;
    });
  }

  setCurrentArticle(index) {
      this.currentArticle = this.articles[index];
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
      console.log("new article")
    }else{
      console.log("update article")
    }

  }

  updateForm(ar?) {
    this.form.setValue({
      name: this.currentArticle.name,
      description: this.currentArticle.description,

    });

    console.log(this.currentArticle);
  }

  addArticle() {
    this.currentArticle ={id: null, name: '', description: '', state: '', date: new Date()};
    this.updateForm();
  }

  createArticle() {
    const newArticle = {
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
    const articleData  = {
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

  deleteArticle( ) {

    this.server.deleteArticle( this.currentArticle ).then(() => {
      this.getArticles();
    });
  }



  onCancel() {
    this.modalRef.hide();
  }





}
