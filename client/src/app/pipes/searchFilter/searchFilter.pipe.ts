import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {
        return items.filter(item =>{
            for (let key in item ) {
                if (('' + item[key]).toLowerCase().includes(criteria.toLowerCase())) {
                    return true;
                }

                // search in objects
                if (item[key] && typeof item[key] === 'object') {
                    if (!item[key].length) {
                        for (let keyChild in item[key] ) {
                            if (('' + item[key][keyChild]).toLowerCase().includes(criteria.toLowerCase())) {
                                return true;
                            }
                        }
                    } else if (item[key].length >= 0) { // search in arrays
                        for (let i=0; i<item[key].length; i++) {
                            for (let keyChild in item[key][i] ) {
                                if(('' + item[key][i][keyChild]).toLowerCase().includes(criteria.toLowerCase())) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        });
    }
}
