import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Repository, Registry, Tag } from '@app/marketplace/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'loop-repositories-dialog',
  templateUrl: './repositories-dialog.component.html',
  styleUrls: ['./repositories-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RepositoriesDialogComponent implements OnInit {

  repositories: Array<Repository> = [];
  displayedColumns = ['tag', 'architecture', 'created', 'layers'];
  dataSources: any = {};

  loading = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Registry,
  ) { }

  ngOnInit(): void {

    if (this.data) {
      this.data.repositories

      .subscribe(repositories => {
        this.repositories = repositories;
        setTimeout(() => {
          this.refreshTags();
        }, 0);
      });
    }

  }

  /**
   * Refresh tags information for each repository
   *
   * @memberof RepositoriesDialogComponent
   */
  refreshTags() {
    const observables = [];
    this.repositories.forEach(repository => {
      repository.tagsInfo = [];
      this.dataSources[repository.name] = new MatTableDataSource<Tag>([]);

      if (repository.tags) {
        repository.tags.forEach(tag => {
          this.data.repositoryInfo(this.data, repository, tag)
          .pipe(
              map((b) => {
                  b.created = b.created.replace(/"/g, '');
                  b.created = new Date(b.created).toString();
                return b;
              })
            )
            .subscribe(tagInfo => {
              repository.tagsInfo.push(tagInfo);
              this.dataSources[repository.name].data = repository.tagsInfo;
            });
        });
      }

    });

    this.loading = false;
  }

}
