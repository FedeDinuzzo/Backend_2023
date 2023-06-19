var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var nombre = "5";
var numero = 5;
var suma = nombre + numero;
console.log(suma);
// Estos son constructores con mayusculas
// No se usan para definir variables
// String
// Number
// Boolean
// A la funcion tambien le puedo definir que tipo puede devolver
var sumar = function (num1, num2) {
    return num1 + num2;
};
console.log(sumar(5, 10));
var Catus = /** @class */ (function () {
    function Catus(cantPatas) {
        this.cantPatas = cantPatas;
    }
    return Catus;
}());
var Gato = /** @class */ (function (_super) {
    __extends(Gato, _super);
    function Gato(nombre, cantPatas) {
        var _this = _super.call(this, cantPatas) || this;
        _this.nombre = nombre;
        return _this;
    }
    Gato.prototype.respirar = function () {
        console.log("Im a beauty cat");
    };
    return Gato;
}(Catus));
var Tiburon = /** @class */ (function () {
    function Tiburon(nombre) {
        this.nombre = nombre;
    }
    Tiburon.prototype.respirar = function () {
        console.log("Glu glu glu");
    };
    return Tiburon;
}());
var gato1 = new Gato("Copito de nieve", 4);
var tiburon1 = new Tiburon("Tiburoncin");
tiburon1.respirar();
gato1.respirar();
// Se puede trabajar con herencia y con clases en comun
