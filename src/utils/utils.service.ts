import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  async forEachAsync<T>(
    array: T[],
    fn: (element: T, index: number, array: T[]) => Promise<void>,
  ) {
    const promiseArray = array.map(fn);
    await Promise.all(promiseArray);
  }
}
