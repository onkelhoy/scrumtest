export interface IQuestion {
  question:string;
  options:(string | boolean | number)[];
  answers:number[];
  desiredAnswers:number|null;
}