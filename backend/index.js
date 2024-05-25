const express = require("express");
const mongoose = require('mongoose');

// Create an Express application
const app = express();

app.use(express.json());
// mongodb+srv://Nouha:<password>@mid.w8bwhdt.mongodb.net/

// Connect to MongoDB
mongoose.connect("mongodb+srv://Nouha:12345@mid.w8bwhdt.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err));

// Define schemas and models for the data
const medicamentSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    time: Number,
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

const supplierSchema = new mongoose.Schema({
    name: String,
    address_for: String,
    Ntel: Number,   
});

const Supplier = mongoose.model('Supplier', supplierSchema);

const patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    Ntel: Number,
    address_pa: String,
});

const Patient = mongoose.model('Patient', patientSchema);

const sellerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    Ntel: Number,
    address_far: String,
});

const Seller = mongoose.model('Seller', sellerSchema);

const pharmacySchema = new mongoose.Schema({
    Ntel: Number,
    address_far: String,
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

const transactionSchema = new mongoose.Schema({
    payment_method: Number,
    cost: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const prescriptionSchema = new mongoose.Schema({
    Time: Number,
    disease: String,
    desc: String,
    manufacturing_date: Date,
    expiration_date: Date,
    Age: Number,
    Allergy: String,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Define the /add endpoint
app.post("/add", async (req, res) => {

    const { name, quantity } = req.body;

    const newMedicament = new Medicament({
        name,
        quantity
    });

    try {
        const savedMedicament = await newMedicament.save();
        res.status(201).json(savedMedicament); // Corrected to savedMedicament
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post("/home", async (req, res) => {
    try {
        const { name, address_for, Ntel } = req.body;

        const a = new Supplier({
            name,
            address_for,
            Ntel,
        });

        const savedsupplier = await a.save();
        res.status(201).json(savedsupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.post("/back", async (req, res) => {
    try {
        const { Time,  disease,  desc,manufacturing_date, expiration_date, Age,Allergy } = req.body;

        const b = new Prescription ({
            Time,
            disease,
            desc,
            manufacturing_date,
            expiration_date,
            Age,
            Allergy,
        });

        const prescription = await b.save();
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.post("/front", async (req, res) => {
    try {
        const { payment_method, cost} = req.body;

        const c = new Transaction ({
            payment_method,
            cost,
            
        });

        const Transaction = await c.save();
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//Patient

app.post("/front", async (req, res) => {
    try {
        const { payment_method, cost} = req.body;

        const d = new Patient ({
            payment_method,
            cost,
            
        });

        const Patient = await d.save();
        res.status(201).json(Patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Start the server
app.listen(3000, () => {
    console.log("Backend server is running on port 3000");
});

