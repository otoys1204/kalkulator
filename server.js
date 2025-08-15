const express = require("express");
const app =express();
const port = 3000;

//agar node js bisa baca dri public

app.use(express.urlencoded({ extended:true }));
app.use(express.static("public"));

//ha;aamn ustama
app.get("/", (req,res) => {
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Calculator</title>
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="calculator-container">
        <div class="calculator-header">
            <h1>Modern Calculator</h1>
            <p>Simple yet powerful calculator</p>
        </div>
        
        <form method="POST" action="/" class="calculator-form">
            <div class="input-group">
                <input type="number" name="angka1" placeholder="First number" required class="calculator-input">
            </div>
            
            <div class="operator-selector">
                <button type="button" class="operator-btn" data-value="+">+</button>
                <button type="button" class="operator-btn" data-value="-">-</button>
                <button type="button" class="operator-btn" data-value="*">×</button>
                <button type="button" class="operator-btn" data-value="/">÷</button>
                <input type="hidden" name="operator" id="selected-operator" value="+">
            </div>
            
            <div class="input-group">
                <input type="number" name="angka2" placeholder="Second number" required class="calculator-input">
            </div>
            
            <button type="submit" class="calculate-btn">Calculate</button>
        </form>
        
        ${req.query.hasil ? `
        <div class="result-container">
            <div class="result-display">
                <span class="result-label">Result:</span>
                <span class="result-value">${req.query.hasil}</span>
            </div>
        </div>
        ` : ""}
    </div>
    
    <script>
        document.querySelectorAll('.operator-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.operator-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('selected-operator').value = this.dataset.value;
            });
        });
    </script>
</body>
</html>
        `);
});

//proses hitung
app.post("/", (req, res) => {
    const {angka1, angka2, operator } = req.body;
    const num1 = parseFloat(angka1);
    const num2 = parseFloat(angka2);
    let hasil;

    switch (operator) {
        case "+" :hasil = num1 + num2; break;
        case "-" :hasil = num1 - num2; break;
        case "*" :hasil = num1 * num2; break;
        case "/" :hasil = num2 !== 0 ? num1 / num2: "Tidak bisa dibagi 0"; break
        default: hasil = "Operator tidak valid";
    }

    res.redirect(`/?hasil=${hasil}`);
});
app.listen(port, () => {
    console.log(`Server Berjalan di http://localhost:${port}`);
});