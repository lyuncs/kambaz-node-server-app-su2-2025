export default function PathParameters(app) {
    // add
    app.get("/lab5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });

    // substract
    app.get("/lab5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const difference = parseInt(a) - parseInt(b);
        res.send(difference.toString());
    });

    // multiply
    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const product = parseInt(a) * parseInt(b);
        res.send(product.toString());
    });

    // divide
    app.get("/lab5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const quotient = parseInt(a) / parseInt(b);
        res.send(quotient.toString());
    });
}
