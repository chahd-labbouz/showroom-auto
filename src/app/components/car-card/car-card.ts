import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  faHeart = faHeart;

  @Input() car!: Auto;
  @Input() isFavorite = false;
  @Output() onSelect = new EventEmitter<Auto>();
  @Output() onToggleFavorite = new EventEmitter<Auto>();

  select() {
    this.onSelect.emit(this.car);
  }

  toggleFavorite() {
    this.onToggleFavorite.emit(this.car);
  }
}