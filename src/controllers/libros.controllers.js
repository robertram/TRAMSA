const librosCtrl={};

librosCtrl.renderLibrosFormulario=(req,resp)=>{
  resp.send('renderLibrosFormulario')
}

librosCtrl.crearNuevoLibro=(req, res)=>{
    res.send('crearNuevoLibro')
}

module.exports= librosCtrl;