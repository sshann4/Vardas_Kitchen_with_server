import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sidebarFilter'
})
export class SidebarFilterPipe implements PipeTransform {

  transform(value, args?) {
    // ES6 array destructuring
    let [difficulty] = args;
    return value.filter(recipe => {
      return recipe.difficulty == difficulty;
    });
  }

}
