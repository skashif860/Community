
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchPackage'
})

export class PackageSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let packagerequest = new RegExp(args, 'ig');
    if (value) {
      return value.filter(searchrequest => {
        if(searchrequest.orgname || searchrequest.packagename ){
         if((searchrequest.orgname.search(packagerequest) !== -1 ) || (searchrequest.packagename.search(packagerequest) !== -1 )){
            return true;
          }
     
        }
      });
    }
  }
}
