//_______________________ ┏  Info  ┓ _______________________\\
//
//   Credit : AlipBot
//   
//   Note 
//   Jangan Jual SC ini ,
//   Jangan Buang Text ini,
//   Siapa Mahu Upload Jangan Lupa Credit :),
//   Siapa Tidak Letak Credit Akan Ambil Tindakan
//   
//_______________________ ┏ Make By AlipBot ┓ _______________________\\

const express = require('express'); 
const app = express();
const getIP = require('ipware')().get_ip;
var favicon = require('serve-favicon')
var path = require('path')
var cookieParser = require('cookie-parser');
var createError = require('http-errors')
require('./settings')


cors = require('cors'),


    secure = require('ssl-express-www');
const PORT = process.env.PORT || 3000 || 5000 || 3000

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))

var main = require('./routes/main'),
    api = require('./routes/api')

app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("public"))
app.use('/', main)
app.use('/api', api)

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    var color = ["\x1b[31m", "\x1b[32m", "\x1b[33m", '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m'];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + '[ IP ] → ' + ipInfo.clientIp + ' - Requested to folder:' + decodeURIComponent(req.url));
    next();
});

app.use(function (req, res, next) {
	next(createError(404))
  })

app.use(function (err, req, res, next) {
	
	res.sendFile(__path + '/view/404.html')
  })


app.listen(PORT, () => {
    console.log(`
	██████╗ ███████╗███████╗████████╗ █████╗ ██████╗ ██╗
	██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║
	██████╔╝█████╗  ███████╗   ██║   ███████║██████╔╝██║
	██╔══██╗██╔══╝  ╚════██║   ██║   ██╔══██║██╔═══╝ ██║
	██║  ██║███████╗███████║   ██║   ██║  ██║██║     ██║
	╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
			  
     
Re-Make by Mohammad Nayan 
								 
Server running on http://localhost:` + PORT)
console.log(`Hello ${creator}`)
})

module.exports = app

