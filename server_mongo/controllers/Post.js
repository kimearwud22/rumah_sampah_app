const Postt = require('../models/Post');
module.exports = {
    PostBenner: async (req, res) => {
        const data = new Postt({
            photo: req.body.photo,
        })
        try {
            const result = await data.save()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    getAllPostBenner: async (req, res) => {
        try {
            const allBenner = await Postt.find();
            res.json(allBenner);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updatePost:async (req, res) => {
        const filter = { kode: req.params.id }
        const updateData = {
            photo: req.body.photo,
        }
        try {
            const result = await Postt.findOneAndUpdate(filter, updateData)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    
    
    // async (req, res) => {
    //     try {
    //       const post = await Postt.findById(req.params.id);
    //       if (post.photo === req.body.photo) {
    //         try {
    //           const updatedPost = await Postt.findByIdAndUpdate(
    //             req.params.id,
    //             {
    //               $set: req.body,
    //             },
    //             { new: true }
    //           );
    //           res.status(200).json(updatedPost);
    //         } catch (err) {
    //           res.status(500).json(err);
    //         }
    //       } else {
    //         res.status(401).json("You can update only your post!");
    //       }
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   },
}