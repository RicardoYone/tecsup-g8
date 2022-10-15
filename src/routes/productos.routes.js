import { Router } from "express";
import {
  crearProducto,
  subirImagen,
} from "../controllers/productos.controller.js";
import Multer from "multer";
import { nanoid } from "nanoid";

// Sirve para indicar el formato en el cual se va a tratar el archivo
// diskStorage > indicar que el archivo se almacenara en el disco (de manera permanente)
// memoryStorage > indicara que el archivo se almacenara TEMPORALMENTE en la memoria RAM y luego de un rato se eliminara, esto se usa para poder enviarlo a un almacenamiento de terceros (S3, cloudinary, firebase storage, entre otros)
const almacenamiento = Multer.diskStorage({
  destination: "src/imagenes",
  filename: (req, archivo, cb) => {
    console.log(archivo);
    const { mimetype } = archivo;
    // si queremos solamente subir imagenes jpg o pdf's
    if (mimetype == "image/jpeg" || mimetype == "application/pdf") {
      const id = nanoid(5);
      const nombre = id + "-" + archivo.originalname;
      cb(null, nombre);
    } else {
      cb(new Error("Tipo de archivo no compatible"));
    }
  },
});

const multerMiddleware = Multer({
  storage: almacenamiento,
  limits: {
    // 1 byte * 1024 > 1 kb * 1024 > 1 mb * 1024 > 1 gb
    fileSize: 5 * 1024 * 1024,
  },
});

export const productoRouter = Router();

// any > aceptara todos los archivos y mas de uno
// none > aceptara puro texto (no aceptara archivos)
// array(nombre_campo, limite) > aceptara varios archivos definidos mediante un campo (llave) y opcionalmente un limite de cuantos archivos queremos recibir
// fields(campos) > acepta una mezcla de archivos especificados por los campos que vamos a recibir
// single(campo) > aceptara un solo archivo mediante ese nombre del campo
productoRouter.post(
  "/subir-imagen",
  multerMiddleware.single("imagen"),
  subirImagen
);

productoRouter.post("/producto", crearProducto);
