const Photo = require('../models/photo');
const path = require('path');
const fs = require('fs');
// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

exports.get = async (req, res) => {
    const allPhotos = await Photo.find()
                                .sort({createdAt: "descending"});

    res.send(allPhotos);
}


exports.find = async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findById(id);
    res.send(photo);
}

exports.getByAuthorId = async (req, res) => {
    const authorId = req.params.id;
    const photos = await Photo.find({ author: authorId });
    console.log(photos);
    res.send(photos);
}


exports.create = async (req, res) => {
    const { title, description, author } = req.body;
    const photo = req.file.filename;
    // const author = req.user._id;

    const data = {
        title, 
        description,
        photo,
        author
    };

    console.log(data);

    Photo.create(data)
        .then((data) => {
            console.log("تم التحميل بنجاح");
            console.log(data);
            res.send(data);
        })
        .catch((err) => console.log(err));

}


exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    Photo.updateOne({_id: id}, data)
        .then(() => {
            console.log("تم التحديث بنجاح");
            res.send("تم التحديث بنجاح");
        })
        .catch((err) => console.log(err))
}


exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const photo = await Photo.findById(id);

        if(!photo){
            return res.status(404).send('الصورة غير موجودة');
        }

        const filePath = path.join(__dirname, '../public/uploads', photo.photo);
        fs.unlink(filePath, async (err) => {
            if(err) {
                console.log(err);
                return res.status(500).send('حدث خطأ أثناء حذف الملف');
            }

            try {
                await Photo.deleteOne({_id: id});
                console.log('تم الحذف بنجاح');
                res.send('تح الحذف بنجاح');
            } catch (error) {
                console.log(error);
                res.status(500).send('حدث خطأ أثناء حذف الصورة');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('حدث خطأ أثناء الحصول على بيانات الصورة');
    }
}



exports.likePhoto = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.status(404).json({ message: "الصورة غير موجودة" });
        }

        photo.likes.push(userId);

        await photo.save();

        res.status(200).json({ message: "تم الإعجاب بالصورة بنجاح", photo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء الإعجاب بالصورة" });
    }
};


exports.unlikePhoto = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.status(404).json({ message: "الصورة غير موجودة" });
        }

        const index = photo.likes.indexOf(userId);
        photo.likes.splice(index, 1);

        await photo.save();

        res.status(200).json({ message: "تم حذف الـ like بنجاح", photo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء حذف الـ like" });
    }
};