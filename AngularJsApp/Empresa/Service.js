
empresaApp.service('empresaService', function ($http)
{

    //Método responsável por Listar todos os Empresas: READ
    this.getTodasEmpresas = function ()
    {
        return $http.get("/Empresa/GetEmpresa");
    }

    this.getEmpresaNome = function (pesquisa)
    {
        return $http.get("/Empresa/GetEmpresaNome");
    }

    ////Método responsável por Adicionar Empresas: CREATE
    this.adicionarEmpresa = function (empresa) {

        var request = $http({
            method: 'post',
            url: '/Empresa/AdicionarEmpresa',
            data: empresa
        });

        return request;
    }

    ////Método responsável por Atualizar Empresas Por Id: Update
    this.atualizarEmpresa = function (empresa) {

        var requestAtualizado = $http({
            method: 'post',
            url: '/Empresa/AtualizarEmpresa',
            data: empresa
        });
        return requestAtualizado;
    }

    ////Método responsável por Excluir Empresas Por Id: Delete
    this.excluirEmpresa = function (AtualizadoEmpresaId) {

        return $http.post('/Empresa/ExcluirEmpresa/' + AtualizadoEmpresaId);
    }
}
);