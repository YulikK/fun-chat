// import type { CarT, CarNew, CarPower, WinnerT, EngineMode } from "../utils/type";
// import { isCarPowerT, isCarT, isCarTArray, isAWinnersTArray, isStartCarT, isWinnerT } from "../utils/utils.ts";

// const Method = {
//   GET: `GET`,
//   PUT: `PUT`,
//   POST: `POST`,
//   DELETE: `DELETE`
// };

// const END_POINT = `http://127.0.0.1:3000`;

// export default class Api {
//   private endPoint: string = END_POINT;

//   private winnersUrl = `winners`;

//   private garageUrl = `garage`;

//   private engineUrl = `engine`;

//   public async getGarageCars(): Promise<CarT[]> {
//     const response = await fetch(`${this.endPoint}/${this.garageUrl}`, {
//     method: Method.GET,
//     body: null,
//     headers: new Headers(),
//   })

//     const data: unknown = await response.json();
//     if (!isCarTArray(data)) {
//       return Promise.reject(new Error(`Invalid data format`));
//     }
//     if (response.ok) {
//       return data;
//     } 
//     return Promise.reject(new Error(`Response not OK`));
//   }

  
// }

