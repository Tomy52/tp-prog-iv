import { Injectable } from '@angular/core';
import { EnumMap } from '../interfaces/component-logic/enum-map';

@Injectable({
  providedIn: 'root',
})
export class EnumMappingService {
  
  createList<T>(enumType: T)
  {
    let obj: EnumMap[] = [];

    for (var key in enumType) {
      let enumMap:EnumMap = {
        key: key,
        value: String(enumType[key as keyof typeof enumType]) 
      }
      obj.push(enumMap);
    }

    return obj;
  }

  searchEnumValue<T>(enumType: T, value:string)
  {
    let string = String(enumType[value as keyof typeof enumType])

    console.log(string)

    return string
  }
}
