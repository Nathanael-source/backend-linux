const express = require("express");
const db = require("../database/database");

const router = express.Router();

// GET
router.get("/", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
});

// POST
router.post("/", (req, res) => {
    const { name, email } = req.body;

    const result = db
        .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
        .run(name, email);

    res.json({
        id: result.lastInsertRowid,
        name,
        email
    });
});

// PUT
router.put("/:id", (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;

    const result = db
        .prepare("UPDATE users SET name = ?, email = ? WHERE id = ?")
        .run(name, email, id);

    res.json({
        message: "User berhasil diperbarui",
        changes: result.changes
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const result = db
        .prepare("DELETE FROM users WHERE id = ?")
        .run(id);

    res.json({
        message: "User berhasil dihapus",
        changes: result.changes
    });
});

module.exports = router;
