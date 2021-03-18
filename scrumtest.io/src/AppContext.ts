import { createContext } from 'react';
import { IQuestion } from 'types';

export interface IContext {
  score:number,
  index:number,
  setIndex:(index:number) => void,
  questions:IQuestion[]
}

export default createContext({ score: 0, index: 0, questions: [], setIndex: e => e } as IContext)