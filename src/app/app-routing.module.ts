import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  ///Pagina Home (Listo)

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  ///Pagina ScreeSplash (Listo)
  {
    path: 'screen',
    loadChildren: () => import('./pages/screen/screen.module').then(m => m.ScreenPageModule)
  },

  ///Pagina clima
  {
    path: 'clima',
    loadChildren: () => import('./pages/clima/clima.module').then(m => m.ClimaPageModule)
  },
  ///Lista de usaurios
  {
    path: 'userlist',
    loadChildren: () => import('./pages/userlist/userlist.module').then(m => m.UserlistPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  ///Pagina con Storage
  {
    path: 'form-computador',
    loadChildren: () => import('./pages/form-computador/form-computador.module').then(m => m.FormComputadorPageModule)
  },
  {
    path: 'computador/:id',
    loadChildren: () => import('./pages/computador/computador.module').then(m => m.ComputadorPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
