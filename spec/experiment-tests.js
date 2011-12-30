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
        PessoasListViewModel.pop();
    });
    it("adicionar deve inserir no repositorio de list view", function(){
        var p = new PessoaFormViewModel();
        p.nome('Herp');
        p.sobrenome('Derp');
        p.adicionar();
        expect(PessoasListViewModel.list().length).toBe(1);
        PessoasListViewModel.pop();
    });
});

describe("PessoaListView", function(){
    it("adicionar deve inserir na lista interna e no repositorio de pessoas", function(){
        var pessoa = new Pessoa('Herp', 'Derp');
        var pessoaView = new PessoaItemListViewModel(pessoa);
        PessoasListViewModel.push(pessoaView);
        PessoasListViewModel.remove(pessoaView);
        expect(PessoaRepository().length).toBe(0);
    });
});
