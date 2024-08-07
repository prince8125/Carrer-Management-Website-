import { Skills } from "../models/skills.js";
import ErrorHandler from "../middlewares/error.js";

export const addSkills = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const name = req.body.name;
    const description = req.body.description;
    const levelOfProficiency = req.body.levelOfProficiency;
    const yearsOfExperience = req.body.yearsOfExperience;
    const skillLevel = req.body.level;
    let skill = await Skills.findOne({ name });
    if (skill) return next(new ErrorHandler("Skill already Exist", 400));
    const newSkill = await Skills.create({
      user: userId,
      name: name,
      description: description,
      levelOfProficiency: levelOfProficiency,
      yearsOfExperience: yearsOfExperience,
    });
    res.status(200).json({
      success: true,
      message: "Skill Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const skills = await Skills.find({ user: userId });
    res.status(200).json({
      success: true,
      skills: skills,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkillsById=async(req,res,next)=>{
  try{
    const id=req.params.id;
    const skills = await Skills.find({user:id})
    res.status(200).json({
      success:true,
      skills:skills
    })
  }
  catch(error){
    next(error)
  }
}

export const updateSkills = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const levelOfProficiency = req.body.levelOfProficiency;
    const yearsOfExperience = req.body.yearsOfExperience;

    await Skills.findByIdAndUpdate(skillId, {
      name: name,
      description: description,
      levelOfProficiency: levelOfProficiency,
      yearsOfExperience: yearsOfExperience,
    });
    res.status(200).json({
      success: true,
      message: "Skill Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkills = (req, res, next) => {
  try {
    const skillId = req.params.id;
    Skills.findByIdAndDelete(skillId).then(() => {
      res.status(200).json({
        success: true,
        message: "Skill Deleted Successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};
