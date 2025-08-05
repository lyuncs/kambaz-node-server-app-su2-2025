let todos = [
    { id: 1, title: "Task 1", completed: false, description: "First task" },
    { id: 2, title: "Task 2", completed: true, description: "Second task" },
    { id: 3, title: "Task 3", completed: false, description: "Third task" },
    { id: 4, title: "Task 4", completed: true, description: "Fourth task" },
];

let assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
};

function WorkingWithArrays(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const filteredTodos = todos.filter(t => t.completed === completedBool);
            res.json(filteredTodos);
            return;
        }
        res.json(todos);
    });

    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find(t => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        res.json(todo);
    });

    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
            description: "New task description"
        };
        todos.push(newTodo);
        res.json(todos);
    });

    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(t => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.json(todos);
    });

    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find(t => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todo.title = title;
        res.json(todos);
    });

    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find(t => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todo.completed = completed === "true";
        res.json(todos);
    });

    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find(t => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todo.description = description;
        res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todos = todos.map((t) => t.id === parseInt(id) ? { ...t, ...req.body } : t);
        res.sendStatus(200);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });
}

export default WorkingWithArrays;
