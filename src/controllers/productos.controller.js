const productosCtrl={};

productosCtrl.renderProductos=(req,res)=>{
    res.render('index');
}

productosCtrl.renderAcerca=(req,res)=>{
    res.render('acercade');
}

productosCtrl.renderLibros=(req,res)=>{
    res.render('libros');
}

module.exports = productosCtrl;