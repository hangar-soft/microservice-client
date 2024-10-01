// Definicion del modelo que tendrá similitud con la estructura de la tabla en la bd
export class Cliente {
  public id: number;
  public dni: string;
  public first_name: string;
  public last_name: string;
  public birthday: Date;
  public phone: string;
  public mail: string;
  public genre: string;
  public country: string;
  public state: string
}
