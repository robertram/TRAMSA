
const fs= require('fs');
var PdfTable = require('voilab-pdf-table'),
    PdfDocument = require('pdfkit');
 
module.exports = {
    create: function (data2) {

        const {
            CodigoMateriaPrima,
            Descripcion,
            PuntosReOrden,
            UnidadDeMedida,
            CodigoProducto
        }= data2;
        
        console.log("Datos Productos ",data2);
        //console.log("CodigoProducto ", CodigoProducto);
        // create a PDF from PDFKit, and a table from PDFTable
        var pdf = new PdfDocument({
                autoFirstPage: false
            }),
            table = new PdfTable(pdf, {
                bottomMargin: 30
            });
 
        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'CodigoProducto'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right'
            })
            // add table columns
            /*CodigoMateriaPrima,
            Descripcion,
            PuntosReOrden,
            UnidadDeMedida,
            CodigoProducto*/
            .addColumns([
                {
                    id: 'CodigoProducto',
                    header: 'Codigo Producto',
                    align: 'left'
                },
                {
                    id: 'quantity',
                    header: 'Quantity',
                    width: 50
                },
                {
                    id: 'price',
                    header: 'Price',
                    width: 40
                },
                {
                    id: 'total',
                    header: 'Total',
                    width: 70,
                    renderer: function (tb, data) {
                        return 'CHF ' + data.total;
                    }
                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
 
        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();
 
        // draw content, by passing data to the addBody method
        table.addBody([
            {CodigoProducto: {data2}, quantity: 1, price: 20.10, total: 20.10},
            {CodigoProducto: 'Product 2', quantity: 4, price: 4.00, total: 16.00},
            {CodigoProducto: 'Product 3', quantity: 2, price: 17.85, total: 35.70}
        ]);
 
 
        return pdf;
    }
};
