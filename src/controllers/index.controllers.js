const indexCtrl={};

indexCtrl.renderIndex=(req,res)=>{
    res.render('index');
}

indexCtrl.renderAcerca=(req,res)=>{
    res.render('acercade');
}

indexCtrl.renderLibros=(req,res)=>{
    res.render('libros');
}

module.exports = indexCtrl;