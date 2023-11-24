


async function taskInstanceDTO(taskInstance: SingleTaskInstance) {
    return {
        id: taskInstance.id,
        status: taskInstance.status,
        taskId: taskInstance.taskId,
        employeeId: taskInstance.employeeId,
        updatedAt: taskInstance.updatedAt,
        totalTime: taskInstance.subtaskInstances.reduce((acc, item) => acc + item.subtask.time, 0),
        subtasks: taskInstance.subtaskInstances.map((subtaskInstance) => {
            return {
                id: subtaskInstance.id,
                name: subtaskInstance.subtask.name,
                description: subtaskInstance.subtask.description,
                status: subtaskInstance.status,
                time: subtaskInstance.subtask.time,
                updatedAt: subtaskInstance.updatedAt,
            }
        }),
        comments: taskInstance.taskInstanceComments.map((taskComment) => {
            return {
                ...taskComment
            }
        })
    }
}


export {taskInstanceDTO}

