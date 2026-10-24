import { Component, EventEmitter, Output } from '@angular/core';
import { FilterCriteria } from '../../interfaces/filter-criteria';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.css',
})
export class FilterPanel {
  @Output() onFilterChange = new EventEmitter<FilterCriteria>();

  apply(maxPrice: string, minPower: string, sortBy: string) {
    console.log('apply cliqué', maxPrice, minPower, sortBy);
    this.onFilterChange.emit({
      maxPrice: maxPrice === '' ? null : +maxPrice,
      minPower: minPower === '' ? null : +minPower,
      sortBy: sortBy as FilterCriteria['sortBy'],
    });
  }

  reset(maxPrice: HTMLInputElement, minPower: HTMLInputElement, sort: HTMLSelectElement) {
    maxPrice.value = '';
    minPower.value = '';
    sort.value = 'none';
    this.apply('', '', 'none');
  }
}