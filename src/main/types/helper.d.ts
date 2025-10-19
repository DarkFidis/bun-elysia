export interface Helperable {
  asCallback: <T>(promise: Promise<T>, cb: Callback<T | undefined>) => void;
  charToHexa: (s: string) => string;
  delay: (ms: number) => Promise<void>;
  eachAsync: <T>(array: T[], iterator: AsyncIterator<T, void>) => Promise<void>;
  expireAtToTtl: (expireAt: number) => number;
  fromCallback: <T>(fn: (cb: Callback<T>) => void) => Promise<T>;
  mapAsync: <T, U>(array: T[], iterator: AsyncIterator<T, U>) => Promise<U[]>;
  mapSeriesAsync: <T, U>(
    array: T[],
    iterator: AsyncIterator<T, U>,
  ) => Promise<U[]>;
  parseFlatJson: <T>(rawData: string) => T;
  removeDiacritics: (data: unknown) => string;
  repeat: (count: number, iterator: (index: number) => void) => void;
  repeatAsync: (
    count: number,
    iterator: (index: number) => Promise<void>,
  ) => Promise<void>;
  staticImplements: <T>() => (__: T) => void;
  stringHash: (o: unknown) => string;
  validTtlToExpireAt: (ttl: number) => number;
}

export type AsyncIterator<T, U> = (
  item: T,
  index: number,
  ar: T[],
) => Promise<U>;

export type Callback<T> = (err: unknown, value: T) => void;

export type Modify<T, R> = Omit<T, keyof R> & R;
