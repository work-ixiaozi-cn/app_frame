export declare interface Rect {
  width: number;
  height: number;
}

export declare interface Paginate<T = any> {
  page: number;
  page_size: number;
  page_count?: number;
  total?: number;
  data?: T[];
}
