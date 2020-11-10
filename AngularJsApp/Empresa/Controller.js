
// Controller - Empresa:
empresaApp.controller('empresaCtrl', function ($scope, empresaService) {

    //Aqui estamos carregando todos os dados gravados da empresa quando a página for recarregada:
    carregarEmpresas();

    //Método responsável por carregar todas as propriedades da Empresa:
    function carregarEmpresas() {
        var listarEmpresas = empresaService.getTodasEmpresas();

        listarEmpresas.then(function (d) {
            //se tudo der certo:
            $scope.Empresas = d.data;
        },
            function () {
                alert("Ocorreu um erro ao tentar listar todas as Empresas!");
            });
    }

    //TODO
    //Método responsável por carregar todas as propriedades da Empresa por nome:
    function carregarEmpresaNome(pesquisa) {
        var listarEmpresas = empresaService.get(pesquisa);

        listarEmpresas.then(function (d) {
            //se tudo der certo:
            $scope.Empresas = d.data;
        },
            function () {
                alert("Ocorreu um erro ao tentar listar Empresas por nome!");
            });
    }


    ////Método responsável por adicionar cada propriedade de um Nova Empresa:
    $scope.adicionarEmpresa = function () {

        var empresa = {
            empresaId: $scope.empresaId,
            nome: $scope.nome,
            email: $scope.email,
            cnpj: $scope.CNPJ,
            Endereco: $scope.endereco
        };

        var adicionarInfos = empresaService.adicionarEmpresa(empresa);

        adicionarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarEmpresas();
                alert("Empresa Adicionada com Sucesso!");

                $scope.limparDados();
            } else { alert("Empresa não Adicionada!"); }
        },
            function () {
                alert("Ocorreu um erro ao tentar adicionar um Nova Empresa!");
            });
    }

    ////Limpar os campos após inserir os dados no db://Limpar os campos após inserir os dados no db:
    $scope.limparDados = function () {
        $scope.empresaId = "";
        $scope.nome = "";
        $scope.email = "";
        $scope.cnpj = "";
        $scope.endereco = "";
    }

    ////Método responsável por atualizar Empresa pelo Id:
    $scope.atualizarEmpresaPorId = function (empresa) {

        $scope.AtualizadoEmpresaId = empresa.EmpresaId;
        $scope.AtualizadoNome      = empresa.Nome;
        $scope.AtualizadoEmail     = empresa.Email;
        $scope.AtualizadoCnpj      = empresa.CNPJ;
        $scope.AtualizadoEndereco  = empresa.Endereco;
    }

    ////Método responsável por resgatar dados para a exclusão do Emprresa:
    $scope.excluirEmpresaPorId = function (empresa) {
        $scope.AtualizadoEmpresaId = empresa.EmpresaId;
        $scope.AtualizadoNome = empresa.Nome;
    }

    ////Método responsável por atualizar dados do Empresa:
    $scope.atualizarEmpresa = function () {
        var empresa = {
            EmpresaId: $scope.AtualizadoEmpresaId,
            Nome: $scope.AtualizadoNome,
            Email: $scope.AtualizadoEmail,
            CNPJ: $scope.AtualizadoCnpj,
            Endereco: $scope.AtualizadoEndereco
        };
        var atualizarInfos = empresaService.atualizarEmpresa(empresa);
        atualizarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarEmpresas();
                alert("Empresa Atualizada com Sucesso!");
                $scope.limparDadosAtualizados();
            }
            else {
                alert("Empresa não Atualizada");
            }
        },
            function () {
                alert("Ocorreu um erro ao tentar atualizar a Empresa!");
            });
    }

    ////Método responsável por Limpar os Dados depois de Atualizar Emprresa:
    $scope.limparDadosAtualizados = function () {
        $scope.AtualizadoEmpresaId = '';
        $scope.AtualizadoNome = '';
        $scope.AtualizadoEmail = '';
        $scope.AtualizadoCnpj = '';
        $scope.AtualizadoEndereco = '';
    }

    ////Método responsável por excluir o empresa pelo Id:
    $scope.excluirEmpresa = function (AtualizadoEmpresaId) {

        var excluirInfos = empresaService.excluirEmpresa($scope.AtualizadoEmpresaId);
        excluirInfos.then(function (d) {

            if (d.data.success === true) {
                carregarEmpresas();

                alert("Empresa excluída com Sucesso!");
            }
            else {
                alert("Empressa não excluída!");
            }
        });
    }
}
);