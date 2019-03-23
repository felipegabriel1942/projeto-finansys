import { Categoria } from '../../categorias/compartilhada/categoria.model';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Entrada extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria
    ) {
        super();
    }

    static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get paidText(): string {
        return this.pago ? 'Pago' : 'Pendente';
    }
}
