# CYBA-2-semester-project-backend

## Deployment

Project is deployet at [DigitalOcean](https://stingray-app-izet6.ondigitalocean.app/)

## Installation

### Local database

1. Create a local MySQL database

2. Run dummydata.sql from the repository in your database console

### Local backend

1. Clone repository

```markdown
git clone https://github.com/AeselCSS/CYBA-2-semester-project-backend.git
```

2. Navigate to the cloned repository on your machine

```markdown
cd CYBA-2-semester-project-backend
```

3. install necessary dependencies

```markdown
npm install
```

4. Create an .env.development file in the root of the directory

```markdown
touch .env.development
```

5. Copy the API token from the appendix in the report

* Or create and get your own unique token at [https://api.synsbasen.dk/](https://api.synsbasen.dk/)

```markdown
SYNSBASEN_TOKEN=“INSERT TOKEN HERE”
```

6. Insert your database URL

* Follow the prisma format. Schema must be cyba_auto_system:

```markdown
DATABASE_URL="mysql://johndoe:password@localhost:3306/cyba_auto_system"
```

7. Build the apllication

```markdown
npm run build
```

4. Start the backend by running the start script

```markdown
npm start
```

### Integration tests

If you want to run our integration tests, you need to create a seperate .env file called .env.test in the same directory as .env.development

```markdown
touch .env.test
```

Write the same values in the new .env.test file, but write a schema, that differs from your .env.development

```markdown
DATABASE_URL="mysql://johndoe:password@localhost:3306/mydb_integration_test"
SYNSBASEN_TOKEN=“INSERT TOKEN HERE”
```

Finish by running the test script inside your IDE.

```markdown
npm test
```

### Postman

Fork our Postman collection to recieve a fledged out list of possible HTTP requests to our backend.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/29408900-a9691f0f-f14b-4d67-9ee6-043127c59b64?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29408900-a9691f0f-f14b-4d67-9ee6-043127c59b64%26entityType%3Dcollection%26workspaceId%3D2d50fdb0-768d-4aa4-a40e-39a987c609bb)