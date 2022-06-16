import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "../CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "../CarpetaComposite/EmailComponent";
import { Contacto } from "../contacto";
import { EmailManagerSing } from "../EmailManagerSingleton/EmailManagerSing";
import { ICarpeta } from "../Proxy/carpetaProxy";
import { carpetaPrivada } from "../Proxy/carpetasArreglo";


let emailManager = EmailManagerSing.getInstance();


test('1_ Se debe poder crear un Email', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);

  //El email creado no debe ser nulo
  expect(email1 !== null).toBeTruthy;
})

test('2_ Se debe poder crear una carpeta', () => {
  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 1);

  //La carpeta creada debe ser disntinta a nulo
  expect(carpetaNueva !== null).toBeTruthy;
})

test('3_ Agregar a la bandeja de salida una carpeta', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let email3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  //Creamos una carpeta y agregamos 4 emails
  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 1);
  carpetaNueva.Add(email1);
  carpetaNueva.Add(email2);
  carpetaNueva.Add(email3);
  carpetaNueva.Add(email4);

  //Agregamos un mail a la bandeja de salida
  let emailTest5: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre5", "email5")]);
  let bandejaSalida: CarpetaComposite = new CarpetaComposite("Bandeja de Salida", 0);
  bandejaSalida.Add(emailTest5);

  //Agregamos la carpeta con 4 emails a la bandeja de salida que ya posee 1 email
  bandejaSalida.Add(carpetaNueva);

  //Bandeja de salida con los 4 emails de la carpeta + el email que tenía previamente
  expect(bandejaSalida.CantidadEmails()).toBe(5);

  //La carpeta solo debe tener 4 emails
  expect(carpetaNueva.CantidadEmails()).toBe(4);
})


test('4_ El objeto de emailManager no debe ser nulo', () => {
  expect(emailManager !== null).toBeTruthy;
})

test('5_ Se debe poder enviar un email a través del emailManager', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);

  emailManager.Enviar(email1);

  //Se espera que la bandeja de enviados (salida) tenga un email guardado
  expect(emailManager.BandejaEnviados.length).toBe(1);
  expect(emailManager.BandejaEnviados[0].Asunto).toEqual("asunto1");
})

test('6_ Se debe poder crear una carpeta a través del emailManager', () => {
  emailManager.CrearCarpeta("Carpeta1", 1, "", "");

  expect(emailManager.carpetas[1].nombre).toEqual("Carpeta1");
})

test('7_ Se debe poder agregar emails a una carpeta a través del emailManager', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let email3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  emailManager.CrearCarpeta("Carpeta1", 1);
  emailManager.AñadiEmail(1, email1);
  emailManager.AñadiEmail(1, email2);
  emailManager.AñadiEmail(1, email3);
  emailManager.AñadiEmail(1, email4);

  expect(emailManager.carpetas[1].CantidadEmails()).toBe(4);
})

test('8_ Se debe poder eliminar un email de una carpeta a través del emailManager', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let email3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let email4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  //Creamos una carpeta y agregamos cuatro emails
  emailManager.CrearCarpeta("Carpeta1", 1);
  emailManager.AñadiEmail(1, email1);
  emailManager.AñadiEmail(1, email2);
  emailManager.AñadiEmail(1, email3);
  emailManager.AñadiEmail(1, email4);

  //La carpeta debe contener 4 emails
  expect(emailManager.carpetas[1].CantidadEmails()).toBe(4);

  //Borramos un email de la carpeta
  emailManager.BorrarEmail(1, email2);

  //La carpeta ahora debe contener 3 emails
  expect(emailManager.carpetas[1].CantidadEmails()).toBe(3);
})

test('9_ Se debe poder crear una carpeta privada a traves de proxy por medio del emailManager', () => {
  
  //Si la contraseña ingresada es correcta, la función debe devolver una carpeta de emails distinto a nulo.
  expect(emailManager.carpetaPrivada("abc123")!==null).toBeTruthy;
})


test('10_ La carpeta privada creada a través de proxy debe tener el nombre "Private', () => {
  
  //Si la contraseña ingresada es correcta, la función debe devolver una carpeta de emails distinto a nulo.
  expect(emailManager.carpetaPrivada("abc123").nombre).toEqual("Private");
})

test('11_ Se debe poder agregar emails a una carpeta privada a traves de proxy', () => {
  let email1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
   
  //Se agrega por proxy un email a la carpeta privada
  emailManager.carpetaPrivada("abc123").Add(email1);

  //Se espera que la carpeta privada contenga un email.
  expect(emailManager.carpetaPrivada("abc123").CantidadEmails()).toBe(1);
})

it('12_ Cuando se intenta ingresar a carpetaPrivada se debería negar el acceso', () => {
  
  let carpetaPrivada1: ICarpeta = new carpetaPrivada();//En una misma variable se usa distintos metodos

  expect(() => carpetaPrivada1.Acceso("abc123")).toThrow('No se puede acceder directo sin pasar por el Proxy');
});
