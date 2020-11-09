using CadEmpAngularJS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CadEmpAngularJS.Controllers
{
    public class EmpresaController : Controller
    {
        #region Método para Listar Empresa - READ

        // GET Empresa/GetEmpresa
        public JsonResult GetEmpresa()
        {
            using (var db = new EmpresasEntities())
            {
                List<Empresa> listarEmpresa = db.Empresas.ToList();

                return Json(listarEmpresa, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Método para Adicionar Empresa - CREATE

        //POST Empresa/AdicionarEmpresa
        [HttpPost]
        public JsonResult AdicionarEmpresa(Empresa empresa)
        {
            if (empresa != null)
            {
                using (var db = new EmpresasEntities())
                {
                    db.Empresas.Add(empresa);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }

        #endregion

        #region Método para Atualizar Empresa - UPDATE

        [HttpPost]
        public JsonResult AtualizarEmpresa(Empresa empresa)
        {
            using (var db = new EmpresasEntities())
            {
                var empresaAtualizada = db.Empresas.Find(empresa.EmpresaId);

                if (empresaAtualizada == null)
                {
                    return Json(new { success = false });
                }

                else
                {
                    empresaAtualizada.Nome     = empresa.Nome;
                    empresaAtualizada.CNPJ     = empresa.CNPJ;
                    empresaAtualizada.Endereco = empresa.Endereco;
                    empresaAtualizada.Email    = empresa.Email;

                    db.SaveChanges();
                    return Json(new { success = true });

                }
            }
        }
        #endregion

        #region Método para Excluir Empresa - DELETE

        [HttpPost]
        public JsonResult ExcluirEmpresa(int id)
        {
            using (var db = new EmpresasEntities())
            {
                var empresa = db.Empresas.Find(id);
                if (empresa == null)
                {
                    return Json(new { success = false });
                }

                db.Empresas.Remove(empresa);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
        #endregion
    }
}