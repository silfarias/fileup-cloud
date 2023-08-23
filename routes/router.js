const router = require('express').Router();
const { renderUploadView,
        renderCloudView,
        uploadToCloudinary, 
        listImages,
        uploadLocalFile } = require('../controllers/controller')



//RUTAS PARA RENDERIZAR VISTAS
router.get('/upload-local', renderUploadView)
router.get('/upload-cloudinary', renderCloudView);
router.get('/images', listImages)



// Ruta para manejar la subida de archivos
router.post('/upload-local', uploadLocalFile);
router.post('/upload-cloudinary', uploadToCloudinary);

module.exports = router;



