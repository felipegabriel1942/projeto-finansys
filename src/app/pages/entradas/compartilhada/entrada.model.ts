import {Categoria } from '../../categorias/compartilhada/categoria.model';

export class Entrada {
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
    ) {}

    static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get paidText(): string {
        return this.pago ? 'Pago' : 'Pendente';
    }
}
