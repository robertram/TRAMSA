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

indexCtrl.renderError=(req,res)=>{
    res.render('error');
}

module.exports = indexCtrl;