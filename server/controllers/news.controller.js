import News from "../models/News.js";

export const createNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    let media = null;
    let mediaType = null;

    if (req.file) {
      media = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";
    }

    const news = await News.create({
      title,
      description,
      media,
      mediaType,
      author: req.userId, 
    });

    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    news.title = req.body.title || news.title;
    news.description = req.body.description || news.description;

    if (req.file) {
      news.media = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      news.mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";
    }

    await news.save();
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName");

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await news.deleteOne();
    res.status(200).json({ message: "News deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
