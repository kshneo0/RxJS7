import { EMPTY, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, map } from "rxjs/operators";

// 57. Flattening Operators - Error Handling - First Solution

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`)
    ),
    catchError(() => EMPTY)
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log("Error:", err),
    complete: () => console.log("Completed"),
  });

// 오류가 발생한 후에도 다시 데이터를 가져오고 싶다면 어떻게 해야 하나?
