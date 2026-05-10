const prisma = require("../prisma/client");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await prisma.task.count({
      where: {
        assignedToId: userId,
      },
    });

    const completedTasks = await prisma.task.count({
      where: {
        assignedToId: userId,
        status: "COMPLETED",
      },
    });

    const pendingTasks = await prisma.task.count({
      where: {
        assignedToId: userId,
        status: {
          not: "COMPLETED",
        },
      },
    });

    const overdueTasks = await prisma.task.count({
      where: {
        assignedToId: userId,
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "COMPLETED",
        },
      },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getDashboardData,
};