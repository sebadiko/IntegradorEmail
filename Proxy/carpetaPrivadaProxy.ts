import { CarpetaComposite } from '../CarpetaComposite/CarpetaComposite';
import { ICarpeta } from './carpetaProxy';

export class carpetaPrivadaProxy implements ICarpeta{
    private pCarpetaPrivada : CarpetaComposite;

    
    Acceso(password: string) {
        if(password == "abc123"){
            if(this.pCarpetaPrivada == null){
                this.pCarpetaPrivada = new CarpetaComposite("Private", 0);
            }
            return this.pCarpetaPrivada;
        }
    }
 
}