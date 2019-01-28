import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vidFilter'
})
export class VidFilterPipe implements PipeTransform {

 	transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        var allSubs = "";
        for (var i = 0; i < items.length; ++i) {
        	for (var j = 0; j < items[i].subs.length; ++j) {
        		// code...
        	}
        	// code...
        }
        return items.filter(item => item.subtitleFname.indexOf(filter) !== -1);
    }

}
