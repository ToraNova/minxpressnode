/*
 * Routes used for user control and events
 * all urls are prefixed with /user (defined under main.js)
 */

//router module to be used
const express = require("express")
const router = express.Router()

//logger imports
const logger = require("../services/logger.js")
logger.defaultMeta = { label:"File" }

//import multer (file upload middleware)
const multer = require("multer")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		logger.debug( file )
		cb(null, file.fieldname + '-' + Date.now())
	}
})

const upload = multer({ storage: storage })

//scheduler TODO: fix the scheduler
//const agendajs = require("../jobs/agenda.js")

router.post('/upload', async (req, res) => {

})

//<form action="/upload" enctype="multipart/form-data" method="POST">
//<input type="file" name="file" />
//<input type="submit" value="Upload a file"/>
//</form>
router.post('/upload', upload.single('file'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('File Upload Error')
		error.httpStatusCode = 400
		return next(error)
	}
	logger.debug( req )
	logger.info(`File upload from ${req.body.email} ${req.ip}`)
	res.send(file)
})

//<form action="/upload/photo" enctype="multipart/form-data" method="POST">
//<input type="file" name="imagefile" accept="image/*" />
//<input type="submit" value="Upload Photo"/>
//</form>

//export the routes
module.exports = router
