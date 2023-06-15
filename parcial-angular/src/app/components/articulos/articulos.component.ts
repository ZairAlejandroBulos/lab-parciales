import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { RubroService } from 'src/app/services/rubro.service';
import { Articulo } from 'src/types/Articulo';
import { Rubro } from 'src/types/Rubro';

@Component({
    selector: 'app-articulos',
    templateUrl: './articulos.component.html'
})
export class ArticulosComponent implements OnInit {

    rubros: Rubro[] = [];
    articulos: Articulo[] = [];
    selectedRubroId: number = -1;

    constructor(private service: ArticuloService, private rubroService: RubroService) {}

    ngOnInit(): void {
        this.getAllRubros();
    }

    async getAllRubros() {
        this.rubros = await this.rubroService.findAllRubros();
    }

    async getArticulosByRubro(idrubro: number) {
        this.articulos = await this.service.findArticuloByRubro(idrubro);
    }

    async handleChangeRubro() {
        this.getArticulosByRubro(this.selectedRubroId);
    }

    async handleDelete(id: number) {
        await this.service.deleteArticulo(id);
        window.location.reload();
    }
}
