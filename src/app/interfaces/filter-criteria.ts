export interface FilterCriteria {
  maxPrice: number | null;
  minPower: number | null;
  sortBy: 'none' | 'price-asc' | 'price-desc' | 'power-asc' | 'power-desc';
}