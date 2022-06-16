import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "../CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "../CarpetaComposite/EmailComponent";
import { ICarpeta } from "./carpetaProxy";


export class carpetaPrivada implements ICarpeta{
    public carpetaContenido: CarpetaComposite[] = [];

    Acceso(password: string): any {
        throw new Error('No se puede acceder directo sin pasar por el Proxy');
    }

    public agregarCarpeta(pCarpeta: CarpetaComposite[]): any{
        this.carpetaContenido = pCarpeta;
    }

    public busquedaCarpeta(pIdentificador: number):CarpetaComposite{
        return this.carpetaContenido[pIdentificador];
    }

}