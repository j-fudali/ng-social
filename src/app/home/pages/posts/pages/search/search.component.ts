import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { PostsActions } from 'src/app/shared/store/posts';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRouteSnapshot);
  private usersService = inject(UsersService);
  private router = inject(Router);
  private search = this.route.paramMap.get('search');
  userId = this.usersService.getUserId();
  ngOnInit(): void {
    if (this.search)
      this.store.dispatch(PostsActions.searchPublic({ search: this.search }));
    else {
      this.router.navigate(['/posts']);
    }
  }
}
