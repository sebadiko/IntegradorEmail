export class Contacto {

    private Nombre: string = "";
    private Email: string = "";

    constructor(nombre: string, email: string) {
        //seteamos los valores de nombre y email
        this.Nombre = nombre;
        this.Email = email;

    }
    public GetNombre(): string {
        return this.Nombre;
    }
    public GetEmail(): string {
        return this.Email;
    }   
}