const prisma = require("../prisma/client");

const createProject = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};