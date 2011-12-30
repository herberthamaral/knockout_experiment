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
    });
    it("adicionar deve inserir no repositorio de list view", function(){
        var p = new PessoaFormViewModel();
        p.nome('Herp');
        p.sobrenome('Derp');
        p.adicionar();
        expect(PessoaListViewModel.list().length).toBe(1);
        PessoaListViewModel.list.pop();
    });
})
