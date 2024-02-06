const cloudinary = require('cloudinary').v2
const upload = require('../config/multer')
const { Painting } = require('../models/painting')

const getPaintings = async (req, res) => {
    const paintings = await Painting.find()
    res.json(paintings)
}

const getPaintingById = async (req, res) => {
    const painting = await Painting.findById(req.params.id)

    if (!painting) return res.status(404).send('Painting not found')

    res.json(painting)
}

const createPainting = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            throw new Error(err)
        } else {
            try {
                const result = await cloudinary.uploader.upload(req.file.path)
                const newPainting = new Painting({
                    src: result.secure_url,
                    title: req.body.title,
                    paintingType: req.body.paintingType,
                    price: req.body.price
                })

                const savedPainting = await newPainting.save()
                res.status(201).json(savedPainting)
            } catch (err) {
                throw new Error(err)
            }
        }
    })
}

const updatePainting = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            throw new Error(err)
        } else {
            try {
                let painting = await Painting.findById(req.params.id)

                if (!painting) {
                    return res
                        .status(404)
                        .json({ msg: 'Pintura no encontrada' })
                }

                let paintingData = {
                    title: req.body.title || painting.title,
                    paintingType:
                        req.body.paintingType || painting.paintingType,
                    price: req.body.price || painting.price
                }

                if (req.file) {
                    const result = await cloudinary.uploader.upload(
                        req.file.path
                    )
                    paintingData.src = result.secure_url
                }

                painting = await Painting.findByIdAndUpdate(
                    req.params.id,
                    paintingData,
                    { new: true }
                )

                res.json(painting)
            } catch (err) {
                throw new Error(err)
            }
        }
    })
}

const DeletePainting = async (req, res) => {
    const painting = await Painting.findByIdAndRemove(req.params.id)

    if (!painting) return res.status(404).send('Painting not found')

    res.json(painting)
}

module.exports = {
    createPainting,
    getPaintings,
    getPaintingById,
    updatePainting,
    DeletePainting
}
