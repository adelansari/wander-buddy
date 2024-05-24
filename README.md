# Wander-Buddy

Wander-Buddy is a travel buddy application built with React and Symfony. It helps users plan trips by providing information on destinations, weather forecasts, and travel itineraries.

## Setup

- Inside `frontend` directory:
    ```bash
    npm install
    npm run dev
    ```
- Both the frontend and backend applications use environment variables for configuration. These are stored in `.env` files. Before running the applications, you need to create a `.env` file in both the `frontend` and `backend` directories. These files should be based on the `.env.example` files in the respective directories.


## Branching Strategy

We use a feature-branch workflow. The `main` branch is the main codebase. All feature branches are created from `main` and merged back into `main` via pull requests.

Branch names should follow this format: `feature/BE-001` or `feature/FE-001` for backend and frontend tasks respectively. The number corresponds to the issue number in Trello.

## Working with Branches

1. Ensure you're in the `main` branch and it's up-to-date with the remote `main` branch:
    ```bash
    git checkout main
    git pull origin main
    ```

2. Create a new branch for your feature:
    ```bash
    git checkout -b feature/BE-001
    ```

3. Make changes and commit them:
    ```bash
    git add .
    git commit -m "Implement feature BE-001"
    ```

4. Push your branch to the remote repository:
    ```bash
    git push origin feature/BE-001
    ```

## Pull Requests

When your feature is complete and tested, open a pull request against the `main` branch. 

1. Go to the repository on GitHub and click on "Pull requests".
2. Click on "New pull request".
3. Select your feature branch from the dropdown menu.
4. Write a descriptive title and comment for your pull request.
5. Click on "Create pull request".

Please ensure your code passes all checks and has no merge conflicts before requesting a review.

## Code Reviews

All pull requests should be reviewed by at least one other developer. Don't merge your own pull request.

## Merging

Once your pull request has been reviewed and approved, you can merge it into `main`. Always use the "Squash and merge" option on GitHub to keep the commit history clean.

After merging, don't forget to pull the latest changes from `main` on your local machine:

```bash
git checkout main
git pull origin main
```

Then you can delete your feature branch:
```bash
git branch -d feature/BE-001
```

This strategy ensures a clean and manageable commit history, and it allows multiple developers to work on the project without conflicts.