import { of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

// 50. tap
// 5보다 큰 값을 2배해서 출력
/*
of(1, 7, 3, 6, 2)
  .pipe(
    map((value) => value * 2),
    tap((value) => console.log("Spy:", value)),
    filter((value) => value > 5),
  )
  .subscribe((value) => console.log("Output:", value));
*/
/*
  of(1, 7, 3, 6, 2)
    .pipe(
      filter((value) => value > 5),
      tap((value) => console.log("Spy:", value)),
      map((value) => value * 2),
    )
    .subscribe((value) => console.log("Output:", value));
*/

of(1, 7, 3, 6, 2)
  .pipe(
    filter((value) => value > 5),
    map((value) => value * 2),
    tap({
      next: (value) => console.log("Spy:", value),
    })
  )
  .subscribe((value) => console.log("Output:", value));

// tap을 사용하면 Observable이 실행되지 않는다
// https://jaywoz.medium.com/information-is-king-tap-how-to-console-log-in-rxjs-7fc09db0ad5a
