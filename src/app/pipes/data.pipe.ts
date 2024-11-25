import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe'
})
export class DataPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultItems = [];
    for(const item of value){
      if((item.title.indexOf(arg) > -1) ){
        resultItems.push(item);
      };
    };
    return resultItems;
  }

}
