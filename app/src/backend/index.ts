export interface Endpoint<P, R> extends String {}

export interface CallOptions {
  get?: boolean;
  credential?: boolean | string;
}
