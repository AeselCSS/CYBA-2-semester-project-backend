import 'dotenv/config';
import createServer from "./app.js";

// create express app
export const app = createServer();
const port: string | number = process.env.PORT || 3000;

// start express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});