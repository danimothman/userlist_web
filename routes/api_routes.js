var express = require('express');
const { Router } = require('express');
var mysql = require('mysql')
var router = express.Router()


    sql_config = {
        host:'localhost',
        user:'root',
        password:'1234',
        database:'o2'
    }
    
    var db = mysql.createConnection(sql_config)


    router.get('/topic/add', (req, res)=>{
        var sql = "SELECT  * FROM topic";
        db.query(sql,(err, result)=>{
            if(err){
                console.err(err)
                res.status(500).send("Internal Server Error")
            }
            console.log(result)
            res.render("add", {topics:result})
        })
    })


    router.post('/topic/add', (req, res)=>{
        var title = req.body.title;
        var description = req.body.description
        var author = req.body.author
        console.log(`title은 ${title} 설명은 ${description} 글쓴이는 ${author}`)
        var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?,?)'
        var queryData = [title, description,author]
        db.query(sql, queryData , (err ,result)=>{
            if(err) {
                console.log(err)
                res.status(500).send("Internal Server Error")
            }
            console.log(result)
            res.redirect('/topic')
            // res.send("<h1>Sucess</h1>")
        })
    })

    router.get('/topic/edit/:id',(req, res)=>{
        var ids = req.params.id
        var sql = `SELECT * FROM topic WHERE id=${ids}`
        db.query(sql, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Internal server Error")
            }
            console.log(result)
            // console.log("테스트:" + id)
            res.render("edit", {topic:result[0]})
        })

    })

    router.post('/topic/:id/edit', (req, res)=>{
        var id = req.params.id
        var title = req.body.title
        var description = req.body.description
        var author = req.body.author
        var sql = `UPDATE topic SET title=?, description=?, author=? WHERE  id=${id};`
        var upDate = [title, description, author]
        db.query(sql,upDate,(err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Internal Long time Error")
            }
            console.log(title,description,author)
            res.redirect(`/topic/${id}`)
        })

    })


router.get('/topic/delete/:delid',(req, res)=>{
    var delid = req.params.delid
    db.query(`SELECT * FROM topic WHERE id=${delid}`,(err, results)=>{

        var titel = results[0].titel
        var description = results[0].description
        var author = results[0].author
        // var datal = await setTimeout(()=>{console.log(description)},2000)
        // console.log(datal)
        // await console.log(titel)
        // await console.log(description)
        // await console.log(author)

        var sql_l = `INSERT INTO daletelist (title, description, author) VELUES (${title},${description},${author})`
        db.query(sql_l,(err, results)=>{
            var sql =`DELETE FROM topic WHERE id=${delid}`
            if(err){
                console.log(err)
            }
            db.query(sql,(err, result)=>{
                if(err){
                    console.log(err)
                }
                console.log(result_1)
                res.redirect('/topic')
            })
        })


    })
})




    router.get(['/topic','/topic/:id'], (req, res)=>{
    var sql = `SELECT * FROM topic`
    db.query(sql, (err, results)=>{
        var id = req.params.id

        if(id){
            var sql = `SELECT * FROM topic WHERE id=${id}`
            console.log(id)
            db.query(sql,(err, result)=>{
                if(err){
                    console.log(err)
                } 

                console.log.topic
                res.render('view',{topics:results,topic:result[0] })
            })
        } else {
            res.render('view',{topics:results,topic:undefined })
        }
    })
    // var sql = 'SELECT * FROM topic WHERE id=' + id
    
})
module.exports = router;