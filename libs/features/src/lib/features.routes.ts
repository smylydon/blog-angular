import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { singlePostResolver } from './resolvers/single-post.resolver';

const featuresRoutes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: {
      routeResolver: singlePostResolver,
    },
  },
  {
    path: 'post',
    component: AddPostComponent,
  },
  {
    path: 'post/:id',
    component: SinglePostComponent,
    resolve: {
      routeResolver: singlePostResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
