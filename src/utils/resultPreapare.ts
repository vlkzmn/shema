import { Result } from "../types/Result";

const SHEMA_KEY = 'YSQ_S3_schema_';

export function resultPreapare(userAnswers: number[]) {
  let result: Result[] = [];
  // const users: number[] = [];

  // for (let i = 0; i < 90; i++) {
  //   users.push(Math.floor(Math.random() * 6) + 1);
  // }

  for (let i = 0; i < 18; i++) {
    const answers: number[] = [];

    for (let j = i; j < 90; j = j + 18) {
      // answers.push(users[j]);
      answers.push(userAnswers[j]);
    }

    const shema = `${SHEMA_KEY}${i + 1}`;
    const sum = answers.reduce((sum, item) => sum + item);
    const percent = Math.floor(((sum - 5) / 25) * 100);
    const sumFiveSix = answers
      .filter(item => item > 4)
      .reduce((sum, item) => sum + item, 0);    

    result[i] = {
      shema,
      answers,
      sum,
      percent,
      sumFiveSix,
    };
  } 

  return result;
}
