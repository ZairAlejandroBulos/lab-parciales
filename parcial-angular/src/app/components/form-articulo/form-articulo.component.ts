import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { RubroService } from 'src/app/services/rubro.service';
import { Articulo } from 'src/types/Articulo';
import { Rubro } from 'src/types/Rubro';

@Component({
    selector: 'app-form-articulo',
    templateUrl: './form-articulo.component.html'
})
export class FormArticuloComponent implements OnInit {
    
    selectedRubroId: number = -1;
    codigoInicial: string = "";
    rubros: Rubro[] = [];
    articulo: Articulo = {
        "codigo": "",
        "denominacion": "",
        "precio": 0,
        "idrubro": 0
    };

    constructor(private service: ArticuloService, private serviceRubro: RubroService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.getAllRubro();
        this.getArticuloById(Number(id));
    }

    async getAllRubro() {
        this.rubros = await this.serviceRubro.findAllRubros();
    }

    async getArticuloById(id: number) {
        if (id !== -1) {
            this.articulo = await this.service.findArticuloById(id);
            this.selectedRubroId = this.articulo.idrubro;
            this.codigoInicial = this.articulo.codigo;
        }
    }

    handleChangeRubro() {
        this.articulo.idrubro = this.selectedRubroId;
    }

    async getArticuloByCodigo(codigo: string) {
        const newArticulos = await this.service.findArticuloByCodigo(codigo);
        return newArticulos.length !== 0;
    }

    async handleSubmit() {
        const codigoExists = await this.getArticuloByCodigo(this.articulo.codigo);

        if (!codigoExists || (this.codigoInicial !== "" && this.codigoInicial === this.articulo.codigo)) {
            if (this.articulo.id) {
                await this.service.updateArticulo(this.articulo);
            } else {
                await this.service.saveArticulo(this.articulo);
            }

            this.handleNavigate();
        } else {
            alert(`El código ${this.articulo.codigo} ya existe en otro Articulo.`);
        }
    }

    handleNavigate() {
        window.location.href = '/home';
    }
}
