# CYBA-2-semester-project-backend

## Deployment

Project is deployet at [DigitalOcean](https://stingray-app-izet6.ondigitalocean.app/)

# 2nd semester project - auto repair shop - Backend

## Installation

1. Create a new repository locally on your computer, with a name of your choice.

2. Navigate to directory

3. Clone repository

```markdown
git clone https://github.com/YawHB/CYBA-2-semester-project-backend.git .
```

4. install necessary dependencies

```markdown
npm install
```

5. Create an .env file in the root of the directory

6. Copy the API key from the appendix in the report

```markdown
SYNSBASEN_TOKEN = “insert key here”
```

7. Insert your URL

```markdown
DATABASE_URL = "Your URL here"
```

### Local installation

8. Create a local database

9. Copy and paste the dummy data from the repository into your database

-   Remember to run the data.
-   You should now have populated tables.

. Generate Prisma Client to apply database migrations

```markdown
npx prisma generate
```

### Postman

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/29408900-a9691f0f-f14b-4d67-9ee6-043127c59b64?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29408900-a9691f0f-f14b-4d67-9ee6-043127c59b64%26entityType%3Dcollection%26workspaceId%3D2d50fdb0-768d-4aa4-a40e-39a987c609bb)
