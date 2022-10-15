import { Router } from "express";

import { crearPreferencia } from "../controllers/pasarela.controller.js";

export const pasarelaRouter = Router();

pasarelaRouter.post("/crear-preferencia", crearPreferencia);
