const {
    Router
} = require('express');
const router = Router();



router.get('/pdf', (req, res, next)=>{
    const documentDefinition = {
        content: [
            {
                text: 'This is a header, using header style'
            },
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
            {
                text: 'Subheader 1 - using subheader style'
            }
        ]
    }

    //pdfMake.createPdf(documentDefinition).download();
})

router.post('/pdf', (req, res, next) => {
    //const precio= req.body.precio;

    const documentDefinition = {
        content: [
            {
                text: 'This is a header, using header style'
            },
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
            {
                text: 'Subheader 1 - using subheader style'
            }
        ]
    }

    pdfMake.createPdf(documentDefinition).download();
    /*pdfDoc.getBase64((data) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });*/


});

module.exports = router;