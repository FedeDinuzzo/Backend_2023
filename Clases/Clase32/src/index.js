import express from 'express'
import compression from 'express-compression'

const app = express()

// app.use(compression())
// 6.7 kB transferred
// 2.6 MB resources

app.use(compression({
  brotli: { enabled: true, zlib: {} }
}))
// 326 B transferred
// 2.6 MB resources


app.get('/string', (req,res) => {
  let string = "Hi, good night from baires"

  for (let i = 0; i < 100000; i++) {
    // 100k repeated phrase
    string += "Hi, good night from baires"
  }

  res.send(string)
})

app.listen(4000, () => console.log("server on port 4000"))
