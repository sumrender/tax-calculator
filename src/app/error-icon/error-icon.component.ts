import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-error-icon',
  templateUrl: './error-icon.component.html',
  styleUrls: ['./error-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule]
})
export class ErrorIconComponent { }
