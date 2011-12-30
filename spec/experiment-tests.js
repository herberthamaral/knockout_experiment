describe("PessoaFormViewModel", function(){
    it("nome completo deve ser mudado quando uma das partes do nome é mudada", function(){
        var p = new PessoaFormViewModel();
        p.nome('Herp');
        p.sobrenome('Derp');
        expect(p.nome_completo()).toBe("Herp Derp");
    });
    it("adicionar deve inserir no repositorio de pessoas", function(){
        var p = new PessoaFormViewModel();
        p.nome('Herp');
        p.sobrenome('Derp');
        p.adicionar();
        expect(p.repository().length).toBe(1);
        PessoaListViewModel.list.pop();
        PessoaRepository.pop();
    });
    it("adicionar deve inserir no repositorio de list view", function(){
        var p = new PessoaFormViewModel();
        p.nome('Herp');
        p.sobrenome('Derp');
        p.adicionar();
        expect(PessoaListViewModel.list().length).toBe(1);
        PessoaListViewModel.list.pop();
        PessoaRepository.pop();
    });
});

describe("PessoaListView", function(){
    it("remover deve remover da lista de exibicao e do repositorio",function(){
        var pessoa = new Pessoa('Herp', 'Derp');
        var pessoaView = new PessoaItemListViewModel(pessoa);
        PessoaRepository.push(pessoa);
        PessoaListViewModel.list.push(pessoaView);
        pessoaView.remover(pessoaView);
        expect(PessoaRepository().length).toBe(0);
    });
});
