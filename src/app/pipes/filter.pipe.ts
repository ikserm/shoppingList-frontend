import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 3) return value;

    const resultArticles = [];
    for( const article of value){
      if( article.name.toLowerCase().indexOf( arg.toLowerCase() ) != -1 ){
        resultArticles.push(article);
      };
    };
    return resultArticles;
  }

}
