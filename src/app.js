import express from "express";

const app = express()
app.use(express.json())

let users = []
let tweets = []

app.post('/sign-up', (req, res) => {
    const user = {
        username: req.body.username,
        avatar: req.body.avatar
    }
    users.push(user)
    res.send("OK")
})

app.post('/tweets', (req, res) => {
    let inc = 0
    for(let i = 0; i < users.length; i++){
        if(users[i].username === req.body.username) inc ++
    }
    if(inc === 0) return res.send("UNAUTHORIZED")
    const  tweet = {
        username: req.body.username,
        tweet: req.body.tweet
    }
    tweets.push(tweet)
    res.send("OK")
})

app.get('/tweets', (req, res) => {
    if(tweets.length === 0) return res.send(tweets)
    let lstTweets = []
    for(let i = tweets.length - 1; i >= 0 && i >= tweets.length - 10; i--){
        let avatar = ""
        for(let j = 0; j < users.length; j++){
            if(users[j].username === tweets[i].username) avatar = users[j].avatar
        }
        const tweet = {
            username: tweets[i].username,
            avatar: avatar,
            tweet: tweets[i].tweet
        }
        lstTweets.push(tweet)
    }
    res.send(lstTweets)
})

app.listen(5000)