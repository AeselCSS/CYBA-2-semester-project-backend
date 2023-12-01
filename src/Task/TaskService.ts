import TaskRepository from "./TaskRepository.js";
import { Status } from "@prisma/client";
import EmployeeRepository from "../Employee/EmployeeRepository.js";
import {taskInstanceDTO, tasksDTO} from "./TaskDTO.js";
import OrderRepository from "../Order/OrderRepository.js";

export default class TaskService {
    constructor() {}

    public async initiateTask(taskInstanceId: number, employeeId: string) {
        const taskRepository = new TaskRepository();
        const orderRepository = new OrderRepository()
        
        const taskInstance = await taskRepository.getSingleTaskInstance(taskInstanceId);
        const orderStatus = await orderRepository.getOrderStatus(taskInstance.orderId)

        if (taskInstance.status === Status.PENDING && orderStatus.status === Status.IN_PROGRESS) {
            //Transaction
            await taskRepository.initiateTaskInstance(taskInstance, employeeId);

            //return the updated taskInstance with the updated status;
            const result = await taskRepository.getSingleTaskInstance(taskInstanceId);
            return result;
        }

        return null;
    }

    public async getTasks() {
        const taskRepository = new TaskRepository();
        const rawTasks: Tasks[] = await taskRepository.getTasks();
        return tasksDTO(rawTasks);
    }

    public async createComment(taskInstanceId: number, comment: string, employeeId: string) {
        const taskRepository = new TaskRepository();
        const employeeRepository = new EmployeeRepository()

        //Two guards
        await taskRepository.getSingleTaskInstance(taskInstanceId)
        await employeeRepository.getSingleEmployee(employeeId);

        
        return await taskRepository.createComment(taskInstanceId, comment, employeeId);
    }

    public async getSingleTask(taskId: number) {
        const taskRepository = new TaskRepository();
        const rawTaskInstance = await taskRepository.getSingleTask(taskId);
        return taskInstanceDTO(rawTaskInstance);
    }
}
