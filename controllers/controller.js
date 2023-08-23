const path = require('path')
const Archivo = require('../models/archivos');
const ctrl = { };


//Controladores para renderizar vistas
ctrl.listImages = async (req, res) => {
  try {
    const archivos = await Archivo.findAll();
    res.render('list_images', { archivos });
  } catch (err) {
    console.error('Error listing images:', err);
    res.status(500).send('An error occurred while listing images.');
  }
};

ctrl.renderUploadView = (req, res) => {
  res.render('upload');
};

ctrl.renderCloudView = (req, res) => {
  res.render('cloudinary-upload');
};





///////////////////////////////////////////////////////////////////////////////

//Fileupload
ctrl.uploadLocalFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({message:'No files were uploaded.'});
  }

  const { file } = req.files;

  // Procesar el archivo y guardarlo en una carpeta local en el servidor
  const uploadPath = path.join(__dirname, '..', 'public', 'uploads', file.name);
  file.mv(uploadPath, err => {
    if (err) {
      console.log('Error uploading file.', err);
      return res.status(500).json({message: 'Error uploading file.'});
    }
    //res.send('File uploaded successfully.');
    return res.status(201).json({message: 'File uploaded successfully'});
  });
};


//Cloudinary
ctrl.uploadToCloudinary = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const { file } = req.files;

    // Subir imagen a Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    // Guardar la ruta en la base de datos
    const Archivo = await Archivo.create({
      ruta: result.secure_url,
      nombre: file.name,
      descripcion: 'Descripción opcional'
    });

    res.send('Image uploaded to Cloudinary and path saved in database.');
  } catch (err) {
    console.error('Error uploading image to Cloudinary:', err);
    res.status(500).send('An error occurred while uploading the image to Cloudinary.');
  }
};


module.exports = ctrl