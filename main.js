// nom des patients

class Patients {
    constructor(nom, maladie, argent, poche, état_de_santé){
        this.nom = nom
        this.maladie = maladie
        this.argent = argent 
        this.poche = poche,
        this.état_de_santé = état_de_santé
    }
    seDéplacer(lieu) {
        this.lieu = lieu
        console.log(`${this.nom} s'est déplacé vers ${this.lieu}`)
    }
    payer(montant) {
        if (this.argent >= montant) {
            this.argent -= montant; 
            console.log(`${this.nom} paie ${montant} euros, il lui reste ${this.argent} euros.`)
        }
        else {
            console.log(`${this.nom} n'a pas assez d'argent.`)
        }
    }
    prendreTraitement(traitement) {
        this.poche = traitement;
        this.état_de_santé = "guéri";
        console.log(`${this.nom} a pris ${traitement.nom} et est maintenant guéri !`)
    }
    }


let Marcus = new Patients ("Marcus", "mal indenté", 100, "vide", "malade")
let Optimus = new Patients ("Optimus Prime", "unsave", 200, "vide", "malade")
let Songoku = new Patients ("Son Goku", "404", 80, "vide", "malade")
let DarthVader = new Patients ("Dark Vador", "azmatique", 110, "vide", "malade")
let Semicolon = new Patients ("Semicolon", "syntaxError", 60, "vide", "malade")

let patients = [Marcus, Optimus, Songoku, DarthVader, Semicolon]


// cabinet 

let cabinet = {
    nom: "Cabinet",
    personne:["Docteur"]
}

// Docteur

class Docteur {
    constructor() {
        this.nom = "Debugger"
        this.argent = 0
        this.cabinet = ["Chat sphynx"]
        this.diagnostique = null
        this.patientIN = null
        this.patientOUT = null
    }

    accueillir(patient) {
        if (this.patientIN)
            console.log("le cabinet est occupé, le patient " + patient.nom + " doit attendre")
        else {
            this.patientIN = patient // entre dans le cabinet 
            console.log(`${patient.nom} est le suivant.`)
        }
    }
        
    consultation(patient) {
        console.log(`Le docteur consulte le patient ${this.patientIN.nom}`)
        this.patientIN.payer(50); // le patient paye
        this.argent += 50 // se fait payer
        let traitement = this.diagnostiquer(this.patientIN) // diagnostique le patient  
        this.fairesortir() // faire sortir de patient 
        return traitement 
    }

    diagnostiquer(patient) {
        const diagnostics = {
            "mal indenté": "ctrl+maj+f",
            "unsave": "saveOnFocusChange",
            "404" : "CheckLinkRelation",
            "azmatique" : "Ventoline",
            "syntaxError": "f12+doc"
        }

        const traitement = diagnostics[patient.maladie];
        console.log(`${patient.nom} est préscrit pour ${traitement}` )
        return traitement;
    }

    fairesortir(patient) {
        console.log(`${this.patientIN.nom} sort du cabinet`)
        this.patientIN = null
    }
}

// pharmacie et traitement

class Traitement {
    constructor(nom, prix) {
        this.nom = nom
        this.prix = prix
    }
} 

let ctrlMaj = new Traitement ("ctrl+maj+f", 60)
let saveONF = new Traitement ("saveOnFocusChange", 100)
let CheckLink = new Traitement ("CheckLinkRelation", 35)
let Ventoline = new Traitement ("ctrl+maj+f", 40)
let f12 = new Traitement ("f12+doc", 20)

const pharmacie = { 
    nom: "PharmaGeek",
    traitements: [ctrlMaj, saveONF, CheckLink, Ventoline, f12],

    acheter(patient, traitementNOM) {
        let traitement = this.traitements.find(p => p.nom == traitementNOM);
        if (!traitement) {
            console.log(`Le traitement ${traitementNOM} n'existe pas`)
            return false //si n'est pas trouvable
        }
        if (patient.argent >= traitement.prix) {
            patient.payer(traitement.prix)
            patient.prendreTraitement(traitement)
            return true // si achat réussi
        }
        else {
            console.log(`${patient.nom} n'a pas assez d'argent, il est condamné à mourir`)
            return false // si pas assez d'argent
        }
    }
}


// cimetière
class Cimetière {
    static annoncerDeces(patient) {
        console.log(patient.nom + " est décédé faute de soins.")
    }
}


// vérification 

const docteur = new Docteur()

patients.forEach(patient => {
    patient.seDéplacer(cabinet.nom + " et en salle d'attente") // déplace vers le cabinet
})

patients.forEach(patient => {
    docteur.accueillir(patient); // accueille par patient
    const traitement = docteur.consultation()  // consulte par patient
    
    if (traitement) {
        patients.forEach(patient => {
            patient.seDéplacer(pharmacie.nom) // déplace vers la pharmacie
            const guéri = pharmacie.acheter(patient, traitement) //achète les traitements si l'argent est suffisant 
            if (!guéri) {
                Cimetière.annoncerDeces(patient) // annonce le décès
            }
        })
    }
});