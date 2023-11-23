import {Request, Response} from "express";

export default class TaskController {

    constructor() {}

    public async initiateTaskExecutor(request: Request<ReqParams,{},{},{}>, response: Response) {
        const id = parseInt(request.params.id);

        try {
            if (!id) {
                response.status(400).json({error: "Id is not a number"});
                return;
            }



        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}