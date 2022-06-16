import { Contacto } from './../contacto';
import { EmailComponent } from './EmailComponent';

export class EmailLeaf extends EmailComponent{
    public Remitente: Contacto;
    public Para: Array<Contacto> = [];

    constructor(asunto: string, contenido: string, remitente: Contacto, para: Array<Contacto>) {
        super(asunto, contenido);
        this.Remitente = remitente;
        this.Para = para;
    }
  
}