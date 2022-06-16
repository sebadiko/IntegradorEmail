import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "../CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "../CarpetaComposite/EmailComponent";
import { Contacto } from "../contacto";
import { EmailManagerSing } from "../EmailManagerSingleton/EmailManagerSing";


let emailManager = EmailManagerSing.getInstance();

test('Crear Mails en una Carpeta', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  emailManager.CrearCarpeta("Carpeta 1", 1);
 // emailManager.AñadiEmail(1, emailTest1);

  expect(emailManager.carpetas[1].nombre).toEqual("Carpeta 1");
})



test('Agregar la Bandeja de salida con la carpeta creada', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 2);
  carpetaNueva.Add(emailTest1);
  carpetaNueva.Add(emailTest2);
  carpetaNueva.Add(emailTest3);
  carpetaNueva.Add(emailTest4);

  //creo un nuevo email solo en la bandeja de salida
  let emailTest5: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre5", "email5")]);

  let bandejaSalida: CarpetaComposite = new CarpetaComposite("Bandeja de Salida", 1);
  //añado el mail a la bandeja de salida
  bandejaSalida.Add(emailTest5);

  //puedo agregar toda una carpeta dentro de otra
  bandejaSalida.Add(carpetaNueva);

  //se espera que tenga los 5 mails de la carpeta 1  + el mail que se agrego a la bandeja de salida
  expect(bandejaSalida.CantidadEmails()).toBe(5);

  //se espera que la carpeta nueva solo tenga los 4 elementos iniciales
  expect(carpetaNueva.CantidadEmails()).toBe(4);
})

test('El objeto de emailManager no debe ser nulo', () => {
  expect(emailManager !== null).toBeTruthy;
})


test('Se debe poder crear una carpeta de emails', () => {
  emailManager.CrearCarpeta("Carpeta1", 1, "", "");

  expect(emailManager.carpetas[1].nombre).toEqual("Carpeta1");
})


test('Se debe poder agregar emails a una carpeta', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  emailManager.CrearCarpeta("Carpeta1", 1);
  emailManager.AñadiEmail(1, emailTest1);
  emailManager.AñadiEmail(1, emailTest2);
  emailManager.AñadiEmail(1, emailTest3);
  emailManager.AñadiEmail(1, emailTest4);

  expect(emailManager.carpetas[1].CantidadEmails()).toBe(4);
})


test('Se debe poder enviar un email', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);

  emailManager.Enviar(emailTest1);

  expect(emailManager.BandejaEnviados.length).toBe(1);
  expect(emailManager.BandejaEnviados[0].Asunto).toEqual("asunto1");
})
