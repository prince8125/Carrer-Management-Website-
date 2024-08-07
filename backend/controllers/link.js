import { Link } from "../models/link.js";
import ErrorHandler from "../middlewares/error.js";

export const addLink = async (req, res, next) => {
  try { 
    const userId = req.user._id;
    const linkName = req.body.name;
    const linkUrl = req.body.link;
    let link = await Link.findOne({ link: linkUrl });
    if (link)
      return next(
        new ErrorHandler("Link already Exist", 400)
      );

    const newLink = await Link.create({
      user: userId,
      name: linkName,
      link: linkUrl,
    });
    res.status(200).json({
      success: true,
      message: "Link Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getLinks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const links = await Link.find({ user: userId });
    res.status(200).json({
      success: true,
      links: links,
    });
  } catch (error) {
    next(error);
  }
};

export const getLinksById = async (req, res, next) => {
  try {
    const id=req.params.id;
    const links = await Link.find({ user: id});
    res.status(200).json({
      success: true,
      links: links,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteLink = (req, res, next) => {
  try {
    const linkId = req.params.id;
    Link.findByIdAndDelete(linkId).then(() => {
      res.status(200).json({
        success: true,
        message: "Link Deleted Successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};
