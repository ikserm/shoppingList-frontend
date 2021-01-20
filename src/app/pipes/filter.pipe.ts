import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultArticles = [];
    for( const article of value){
      if( article.name.indexOf( arg )> -1 ){
        resultArticles.push(article);
      };
    };
    return resultArticles;
  }

}
