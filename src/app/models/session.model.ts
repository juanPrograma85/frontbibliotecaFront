import { parametrosDTO } from "./serGeneral/propiedades.model";

export class Session {
    public token: string;
    public uuid: string;
    public propiedades: parametrosDTO[]
}