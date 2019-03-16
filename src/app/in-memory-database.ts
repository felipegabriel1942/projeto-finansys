import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from './pages/categorias/compartilhada/categoria.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categorias: Categoria[] = [
            {id: 1, nome: 'Lazer', descricao: 'Cinema, parques, praia, etc'},
            {id: 2, nome: 'Moradia', descricao: 'Pagamentos de contas da casa'},
            {id: 3, nome: 'Saúde', descricao: 'Plano de saúde e remédios'},
            {id: 4, nome: 'Salário', descricao: 'Recebimento de salário'},
            {id: 5, nome: 'Freelas', descricao: 'Trabalhos como freelancer'},
        ];
        return { categorias };
    }
}
