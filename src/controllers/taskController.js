const prisma = require("../prisma/client");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedToId,
      projectId,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
        projectId,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: req.user.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTaskStatus,
};