import { Routes } from '@angular/router';
import { ListaPlantasComponent } from './components/planta/lista-plantas/lista-plantas.component';
import { FormPlantasComponent } from './components/planta/form-plantas/form-plantas.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/plantas'
    },
    {
        path: 'plantas',
        component: ListaPlantasComponent,
    },
    {
        path: 'planta/create', 
        component: FormPlantasComponent,
    },
    {
        path: 'planta/edit/:id',
        component: FormPlantasComponent
    }
];