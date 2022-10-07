export const crearProducto = async (req, res) => {};

export const subirImagen = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.status(201).json({
    message: "Imagen subida exitosamente",
  });
};
