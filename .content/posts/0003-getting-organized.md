---
title: Getting Organized
published_at: 2025-12-01
description: Simplifying the creation of tasks that are planned for delivery
summary: >
  Using GitHub Actions to convert TODO comments in code into GitHub Issues for
  better task management and tracking.
tags:
  - github-actions
  - project-management
  - todo-to-issue
  - ci-cd
---

## Getting Organized

This is a relatively simple task for the smaller projecdts I'm working on. My
initial choice is to make use of
[GitHub Actions - TODO to Issue](https://github.com/marketplace/actions/todo-to-issue)

It's a relatively simple action that scans code for TODO comments and creates
GitHub Issues relevant to those comments.

Eventually, this sort of solution should be extended to enable things, like:

- Issue prioritization
- Creation of issue dependencies

In the near term, I'll _at least_ be making use of the Issue **labeling** and
**milestone** assignment features.

## Example

Here's an example of how to set up the GitHub Action to convert TODO comments:

1. Define my github workflow file `.github/workflows/todo-to-issue.yml`:

<!--
TODO: Add code importing to content rendering
Issue URL: https://github.com/em-jones/emjones/issues/2
 milestone: v1.0.0
 labels: cms, remark
-->

```yaml
name: 'Run TODO to Issue'
on: ['push']
jobs:
  build:
    runs-on: 'ubuntu-latest'
    permissions:
      issues: write
      pull-requests: write # Required for issue linking
      contents: write # Required for issue linking
    steps:
      - uses: 'actions/checkout@v4'
      - name: 'TODO to Issue'
        uses: 'alstr/todo-to-issue-action@v5'
        with:
          INSERT_ISSUE_URLS: 'true' # Insert created issue URLs back into the TODO comments
          CLOSE_ISSUES: 'true' # Close issues when TODOs are removed - default: false

      - name: Set Git user
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
      - name: Commit and Push Changes
        run: |
          git add -A
          if [[ `git status --porcelain` ]]; then
            git commit -m "Automatically added GitHub issue links to TODOs"
            git push origin main
          else
            echo "No changes to commit"
          fi
```

1. Ensure the presence of TODO comments in my codebase, like:

<!-- TODO: This is my example todo
      Using the GitHub Action, this will be converted into a GitHub Issue
      milestone: complete
      labels: no-op -->

```ts
/* TODO: This is my example todo
     Using the GitHub Action, this will be converted into a GitHub Issue
     milestone: complete
     labels: no-op

 */
const doEverythingAndRecordWhatCantBeDoneYet = () => {};
```
