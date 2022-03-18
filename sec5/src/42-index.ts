import { forkJoin } from "rxjs";
import { ajax } from "rxjs/ajax";

// 42. forkJoin - Handle multiple HTTP calls

//Mike is from New Delhi and likes to eat pasta.

const randomName$ = ajax<any>(
  "https:/random-data-api.com/api/name/random_name"
);

const randomNation$ = ajax<any>(
  "https:/random-data-api.com/api/nation/random_nation"
);

const randomFood$ = ajax<any>(
  "https:/random-data-api.com/api/food/random_food"
);

// randomName$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.first_name)
// );
// randomNation$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.capital)
// );
// randomFood$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.dish)
// );

//use forkJoin
forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
  ([nameAjax, nationAjax, foodAjax]) =>
    console.log(`
  ${nameAjax.response.first_name} is from 
  ${nationAjax.response.capital} and likes to eat 
  ${foodAjax.response.dish}.`)
);


// forkJoin은 모든 입력 Obserable이 완료될 때까지 기다렸다가 마지막 값을 내보냅니다.
// 이를 위해 메모리의 각 내부 구독에 대해 알려진 최신 값을 계속 업데이트