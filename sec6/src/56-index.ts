import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatMap, map } from "rxjs/operators";

// 56. Flattening Operators - Dynamic HTTP Request

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`)
    )
  )
  .subscribe((value) => console.log(value));
