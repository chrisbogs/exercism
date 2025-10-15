

class NameFactory {
  private static _instance: NameFactory;
  private _firstLetter: number = 65;
  private _secondLetter: number = 65;
  private _currentNumber: number = 0;
  constructor(){}

  public static getInstance(): NameFactory {
    if (!NameFactory._instance){
      NameFactory._instance = new NameFactory();
    }
    
    return NameFactory._instance;
  }

  public static reset(): void{
    let instance = this.getInstance()
    instance._firstLetter = 65;
    instance._secondLetter = 65;
    instance._currentNumber = 0;
  }
  
  // Creates an identifier of the form: [uppercase letter][uppercase letter][3 digit number]
  public Create(): string {
    if (this._secondLetter >= 65+26*2){
      this._secondLetter = 65;
      this._firstLetter += 1;
    }
    else {
      this._secondLetter += 1;
    }

    this._currentNumber+=1 % 999;

    return String.fromCharCode(this._firstLetter) + String.fromCharCode(this._secondLetter) + this._currentNumber.toString().padStart(3, '0');
  }

}

export class Robot {
  private _name: string = '';
  constructor() {}

  public get name(): string {
    if (this._name === undefined || this._name === ''){
      this._name = NameFactory.getInstance().Create();
    }
    return this._name;
  }

  public resetName(): void {
    this._name = '';
  }

  public static releaseNames(): void {
    NameFactory.reset()
  }
}
