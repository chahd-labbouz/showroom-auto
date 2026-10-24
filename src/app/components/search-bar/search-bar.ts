import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { CarCard } from '../car-card/car-card';

@Component({
  imports: [FontAwesomeModule, CarCard],
  standalone: true,
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnChanges {
  faMagnifyingGlass = faMagnifyingGlass;

  @Input() autos: Auto[] = [];
  @Input() favorites: Auto[] = [];
  @Output() onSelectCar = new EventEmitter<Auto>();
  @Output() onToggleFavorite = new EventEmitter<Auto>();

  selectedAutos: Auto[] = [];
  currentBrand = '';
  favoritesOnly = false;
  availableOnly = false;

  ngOnChanges() {
    this.updateResults();
  }

  selectAutos(searchText: string) {
    this.currentBrand = searchText;
    this.updateResults();
  }

  toggleFavoritesOnly() {
    this.favoritesOnly = !this.favoritesOnly;
    this.updateResults();
  }

  toggleAvailableOnly() {
    this.availableOnly = !this.availableOnly;
    this.updateResults();
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.currentBrand = '';
    this.favoritesOnly = false;
    this.availableOnly = false;
    this.updateResults();
  }

  private updateResults() {
    const query = this.currentBrand.trim().toLowerCase();
    this.selectedAutos = this.autos.filter(auto => {
      const matchesText = !query ||
        auto.brand.toLowerCase().includes(query) ||
        auto.model.toLowerCase().includes(query);
      const matchesFavorites = !this.favoritesOnly || this.favorites.includes(auto);
      const matchesAvailability = !this.availableOnly || auto.availability > 0;
      return matchesText && matchesFavorites && matchesAvailability;
    });
  }

  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto);
  }

  toggleFavorite(auto: Auto) {
    this.onToggleFavorite.emit(auto);
  }
}
