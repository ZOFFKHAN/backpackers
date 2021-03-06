import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class MyFilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            let notMatchingField = Object.keys(filter)
                                         .find(key => item[key] !== filter[key]);

            return !notMatchingField; //true if matches all fields
        });
    }
}