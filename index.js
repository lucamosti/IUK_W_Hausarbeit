//Applikationsvariablen
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000; 

//Cross-origin fuer alle abfragen
var cors = require("cors");
app.use(cors());

//Zum lokalen testen LOESCHEN VOR ABGABE
app.use("/static", express.static("public"));

//Static files
app.use(express.static("./public"));

//JSON File
var products = require("./products.json");

//Variablen
var cart = [];
var rezensionen = [];
var rezIndex = 0; 
var cartindex = 0;
var prodIdReviews = [];

//Bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const fs = require("fs");

//Applikation auf Port starten
app.listen(PORT, () => {
 console.log("Server running on port 3000");
});

//Alle Produkte zurückgeben
app.get("/products", (req, res, next) => {
    res.json(products);
});

//Produkte mit bestimmter ID zurückgeben
app.get("/products/:id", (req,res,next) => {
    var requestedId = req.params.id;
    var rawData = fs.readFileSync("products.json");
    var productJson = JSON.parse(rawData);

    for(var i = 0; i < productJson.length; i++){
        if(productJson[i].id == requestedId){
           var sendData = productJson[i];
        }
    }
    res.send(sendData);
    
});

//Reviews zu Produkten zurückgeben
/*app.get("/products/:id/reviews", (req,res,next) => {
    var requestedId = req.params.id;
    var rawData = fs.readFileSync("products.json");
    var productJson = JSON.parse(rawData);

    for(var i = 0; i < productJson.length; i++){
        if(productJson[i].id == requestedId){
           var sendData = productJson[i].reviews;
        }
    }
    res.send(sendData);
})*/

//Rezension hinzufügen
app.post('/products/:id/reviews', function (req, res) {
        var daten = req.body;
        var rezensionsIndex = rezIndex++; 
        var prodIdRez = daten.id;
        var rezName = daten.nameInput;
        var rezEmail = daten.emailInput;
        var rezDesign = daten.designInput;
        var rezSound = daten.soundInput;
        var rezPreis = daten.preisInput;
        var rezKomm = daten.kommentarInput;
        var newrezEl = new rezElement(rezensionsIndex, prodIdRez, rezName, rezEmail, rezDesign, rezSound, rezPreis, rezKomm);
        rezensionen.push(newrezEl); 
});

app.get("/products/:id/reviews", (req,res, next) => {
    let prodReviewId = req.params.id; 
    for(var i = 0; i < rezensionen.length; i++){
        if(rezensionen[i].prodId == prodReviewId){
           res.send(rezensionen[i]);
        }
    }
});

function rezElement(id, prodId, name, email, design, sound, preis, kommentar){
    this.id = id;
    this.prodId = prodId;
	this.name = name;
	this.email = email;
	this.design = design; 
	this.sound = sound; 
	this.preis = preis; 
	this.kommentar = kommentar;

}

//Warenkorb zurückgeben
app.get("/cart", (req,res, next) => res.send(cart));

//Produkt zum Warenkorb hinzufügen
app.post("/cart", (req, res, next) => {
    var daten = req.body;
    let vorhanden = false;

    for (var i = 0; i < cart.length; i++) {
        if(cart[i].id == daten.id) {
            vorhanden = true;
            cart[i].anz ++;
            res.send(console.log("Artikel bereits im Warenkorb, neue anzahl " + cart[i].anz));
            break;
        } else {
            vorhanden = false;
        }
    }
    if (!vorhanden) {
        var productId = daten.id;
        var productAnzahl = daten.anzahl;
        var aktuellerIndex = cartindex++;
        var newCartProduct = new CartProd(aktuellerIndex, productAnzahl, productId);
        cart.push(newCartProduct);
        res.send(console.log("Artikel konnte dem Warenkorb hinzugefügt werden" + newCartProduct));
    } 
});


//Einkauf abgeschlossen
app.get("/buy", (req, res, next) => {
    cart = [];
    res.send("Einkauf erfolgreich abgeschlossen")
})

function CartProd(ind, anz, id){
    this.index = ind; 
    this.id = id;
    this.anz = anz; 
}

//Warenkorb loeschen
app.post("/deleteone", (req, res, next) => {
    var daten = req.body;

    for (var i = 0; i < cart.length; i++) {
        if(cart[i].id == daten.id) {
            cart.splice(i,1);
            res.send(console.log("Der Artikel wurde entfernt"));
            break;
        }
    }
})

//Id holen
app.get("/prodId", (req,res, next) => {
	res.send(prodIdReviews);
	prodIdReviews = [];
})

//Id posten
app.post("/prodId", (req, res, next) => {
    var daten = req.body;
    prodIdReviews.push(daten.id);

	res.send(console.log("prodId: " + prodId));
});
