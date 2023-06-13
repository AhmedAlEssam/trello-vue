const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const Board = require('../models/Board.js')
const Column = require('../models/Column.js')
const Task = require('../models/Task.js')
const host = 'mongodb://127.0.0.1:27017/trello';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true })

// seeds data ///////////////////////////////

const column1 = new Column({ title: 'Column 1' });
const column2 = new Column({ title: 'Column 2' });
const task1 = new Task({ title: 'Task 1' });
const task2 = new Task({ title: 'Task 2' });
column1.tasks.push(task1, task2);
const board = new Board({ title: 'Board 1' });
board.columns.push(column1, column2);

// حفظ البيانات في قاعدة البيانات
// Promise.all([task1.save(), task2.save(), column1.save(), column2.save(), board.save()]).then(() => {console.log('Data seeded successfully');}).catch((error) => {console.error('Failed to seed data', error);});

// end seeds data ////////////////////////////////


app.get('/api/columns/', (req, res) => {
    Column.find()
        .populate('tasks')
        .then(columns => {
            res.send(columns)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})
app.post('/api/addColumn', (req, res) => {
    const { title } = req.body;
    const column = new Column({ title });
    column.save()
        .then(savedColumn => {
            res.send(savedColumn);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});


app.post('/api/task', (req, res) => {
    const { columnId, title } = req.body;
    const task = new Task({ columnId, title });
    task.save()
        .then(savedTask => {
            Column.findByIdAndUpdate(columnId, { $push: { tasks: savedTask._id } }, { new: true })
                .then(updatedColumn => {
                    res.send(savedTask);
                })
                .catch(error => {
                    res.status(500).send(error);
                });
        })
        .catch(error => {
            res.status(500).send(error);
        });
});
app.patch('/api/task/:id', (req, res) => {
    const _id = req.params.id;
    const task = Task.findById(_id)
    task.title = req.body.text;

    var myquery = { _id: _id };
    var newvalues = { $set: { title: req.body.text  } };
    task.updateOne(myquery,newvalues).then(utask => {
        res.send(utask);
    }).catch(error => {
        res.status(500).send(error);
    })

});
app.post('/api/deleteTask', (req, res) => {

    const taskId = req.body.taksId;
    const columnId = req.body.columnId;
    Task.findByIdAndDelete(taskId)
        .then(deletedTask => {
            Column.findById(columnId).then(column => {
                if (column) {
                    const taskIndex = column.tasks.indexOf(taskId); if (taskIndex > -1) {
                        column.tasks.splice(taskIndex, 1);
                        return column.save();
                    }
                }
                throw new Error('Column or Task not found');
            })
            Column.find()
                .populate('tasks')
                .then(columns => {
                    res.send(columns)
                })
                .catch(err => {
                    res.status(500).send(err)
                })

        })
        .catch(error => {
            res.status(500).send(error);
        });
});






app.get('/api/column/:id', (req, res) => {
    Column.findById(req.params.id)
        .populate('tasks')
        .exec()
        .then(column => {
            res.send(column);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.put('/api/column/:id', (req, res) => {
    Column.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, column) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(column)
        }
    })
})



app.get('/api/board/:id', (req, res) => {
    Board.findById(req.params.id)
        .populate({
            path: 'columns',
            populate: {
                path: 'tasks',
                model: 'Task'
            }
        })
        .exec((err, board) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(board)
            }
        })
})
app.patch('/api/drag/:id', (req, res) => {
    const taskId = req.body.taskId;
    const targetColumnId = req.body.columnId;
    const sourceColumnId = req.body.sourceColumnId;

    Column.findById(sourceColumnId).then(column => {
        if (column) {
            const taskIndex = column.tasks.indexOf(taskId); if (taskIndex > -1) {
                column.tasks.splice(taskIndex, 1);
                return column.save();
            }
        }
        throw new Error('Column or Task not found');
    })
    Column.findByIdAndUpdate(targetColumnId, { $push: { tasks: taskId } }, { new: true })
        .then(updatedTask => {
            const task = Task.findById(taskId).then(tt => {
                res.send(tt);
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(3000, () => {
    require('./apiTable')('http://localhost:3000', app._router.stack)
    console.log('Server is running on port 3000')
})