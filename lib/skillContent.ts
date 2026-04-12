export const SKILL_FILES: Record<string, string> = {
  gh: `---
name: gh
description: Use gh CLI to interact with GitHub — pull requests, issues, Actions workflow runs, and repositories.
---

# gh — GitHub CLI Skill

Use \`gh\` (v2.89.0+) for all GitHub operations.

## Important: use the full binary path

\`rtk\` intercepts the \`gh\` alias with a token-optimized wrapper that doesn't support all flags.
Always call the binary directly:

\`\`\`bash
/opt/homebrew/bin/gh <command>
\`\`\`

## Auth

Auth is persistent via keyring. If a command returns unauthorized:
\`\`\`bash
/opt/homebrew/bin/gh auth login --hostname github.com
/opt/homebrew/bin/gh auth status
\`\`\`

## Repo context

Most commands auto-detect the repo from the current git remote.
Use \`-R OWNER/REPO\` to target another:
\`\`\`bash
/opt/homebrew/bin/gh pr list -R owner/my-repo
\`\`\`

---

## Pull Requests

### View
\`\`\`bash
/opt/homebrew/bin/gh pr view             # current branch
/opt/homebrew/bin/gh pr view 123
/opt/homebrew/bin/gh pr view 123 --comments
/opt/homebrew/bin/gh pr view 123 --json title,body,state,assignees,labels
\`\`\`

### List
\`\`\`bash
/opt/homebrew/bin/gh pr list
/opt/homebrew/bin/gh pr list --assignee "@me"
/opt/homebrew/bin/gh pr list --author "@me"
/opt/homebrew/bin/gh pr list --base main
/opt/homebrew/bin/gh pr list --draft
/opt/homebrew/bin/gh pr list --state merged
/opt/homebrew/bin/gh pr list --json number,title,state,headRefName
\`\`\`

### Create
\`\`\`bash
# Auto-fill from commits, no prompts
/opt/homebrew/bin/gh pr create --fill --base main

# Full control
/opt/homebrew/bin/gh pr create \\
  --title "feat: my feature" \\
  --body "## Summary\\n\\n- bullet" \\
  --base main \\
  --assignee "@me" \\
  --label "bug" \\
  --reviewer teammate

# As draft
/opt/homebrew/bin/gh pr create --fill --draft --base main

# Body from file
/opt/homebrew/bin/gh pr create --title "..." --body-file body.md --base main
\`\`\`

### Edit
\`\`\`bash
/opt/homebrew/bin/gh pr edit 123 --title "New title"
/opt/homebrew/bin/gh pr edit 123 --body "Updated body"
/opt/homebrew/bin/gh pr edit 123 --add-label "bug" --remove-label "wip"
/opt/homebrew/bin/gh pr edit 123 --add-reviewer teammate --remove-reviewer other
/opt/homebrew/bin/gh pr edit 123 --add-assignee "@me"
/opt/homebrew/bin/gh pr edit 123 --milestone "v1.0"
\`\`\`

### Actions
\`\`\`bash
/opt/homebrew/bin/gh pr merge 123 --squash --delete-branch
/opt/homebrew/bin/gh pr merge 123 --merge
/opt/homebrew/bin/gh pr close 123
/opt/homebrew/bin/gh pr reopen 123
/opt/homebrew/bin/gh pr ready 123          # remove draft
/opt/homebrew/bin/gh pr checkout 123       # check out branch locally
/opt/homebrew/bin/gh pr comment 123 --body "LGTM"
/opt/homebrew/bin/gh pr review 123 --approve
/opt/homebrew/bin/gh pr review 123 --request-changes --body "Please fix X"
\`\`\`

### CI Checks
\`\`\`bash
/opt/homebrew/bin/gh pr checks             # current branch
/opt/homebrew/bin/gh pr checks 123
/opt/homebrew/bin/gh pr checks 123 --watch         # wait until done
/opt/homebrew/bin/gh pr checks 123 --json name,state,bucket
\`\`\`

---

## Issues

### View & List
\`\`\`bash
/opt/homebrew/bin/gh issue view 123
/opt/homebrew/bin/gh issue view 123 --comments
/opt/homebrew/bin/gh issue list
/opt/homebrew/bin/gh issue list --assignee "@me"
/opt/homebrew/bin/gh issue list --label "bug"
/opt/homebrew/bin/gh issue list --state closed
/opt/homebrew/bin/gh issue list --json number,title,state,labels
\`\`\`

### Create & Update
\`\`\`bash
/opt/homebrew/bin/gh issue create --title "Bug: something broken" --body "Details..." --label "bug"
/opt/homebrew/bin/gh issue edit 123 --title "Updated" --add-label "confirmed"
/opt/homebrew/bin/gh issue comment 123 --body "Comment text"
/opt/homebrew/bin/gh issue close 123
/opt/homebrew/bin/gh issue reopen 123
\`\`\`

---

## GitHub Actions

### Workflow runs
\`\`\`bash
/opt/homebrew/bin/gh run list                          # recent runs on current branch
/opt/homebrew/bin/gh run list --branch main
/opt/homebrew/bin/gh run list --status failure
/opt/homebrew/bin/gh run list --workflow "CI"
/opt/homebrew/bin/gh run list --json databaseId,displayTitle,status,conclusion,url
\`\`\`

### View / debug
\`\`\`bash
/opt/homebrew/bin/gh run view 12345
/opt/homebrew/bin/gh run view 12345 --log-failed       # logs for failed steps only
/opt/homebrew/bin/gh run view 12345 --log              # full log
/opt/homebrew/bin/gh run watch 12345                   # stream until done
\`\`\`

### Retry / cancel
\`\`\`bash
/opt/homebrew/bin/gh run rerun 12345
/opt/homebrew/bin/gh run rerun 12345 --failed          # only failed jobs
/opt/homebrew/bin/gh run cancel 12345
\`\`\`

---

## Tips

- \`-R OWNER/REPO\` — target any repo explicitly
- \`--json fields\` — machine-readable output, combine with \`--jq\` for filtering
- \`--web\` / \`-w\` — open item in browser
- Use \`--body-file body.md\` for long PR/issue bodies instead of inline \`--body\`
`,

  glab: `---
name: glab
description: Use glab CLI to interact with GitLab — merge requests, issues, CI/CD pipelines, and repos.
---

# glab — GitLab CLI Skill

Use \`glab\` (v1.91.0+) for all GitLab operations.

## Auth

Auth is persistent. If a command returns unauthorized:
\`\`\`bash
glab auth login --hostname gitlab.com
glab auth status
\`\`\`

## Repo context

Most commands auto-detect the repo from the current git directory.
To target a different repo explicitly:
\`\`\`bash
glab mr list -R owner/group/project
\`\`\`

---

## Merge Requests

### View
\`\`\`bash
glab mr view 55                        # by MR ID
glab mr view my-branch-name            # by branch
glab mr view 55 --comments             # with comments/discussions
glab mr view 55 --unresolved           # only unresolved threads
glab mr view 55 --output json
\`\`\`

### List
\`\`\`bash
glab mr list                           # open MRs in current repo
glab mr list --assignee=@me
glab mr list --reviewer=@me
glab mr list --source-branch=my-branch
glab mr list --target-branch=develop
glab mr list --draft
glab mr list --merged
glab mr list --all --output json
\`\`\`

### Create
\`\`\`bash
# From current branch — fills title/desc from commits, no prompts
glab mr create --fill --yes --target-branch develop

# Full control
glab mr create \\
  --title "feat: my feature" \\
  --description "## Summary\\n\\n- bullet" \\
  --target-branch develop \\
  --assignee @me \\
  --label migration \\
  --yes

# As draft
glab mr create --fill --draft --target-branch develop --yes
\`\`\`

### Update
\`\`\`bash
glab mr update 55 --title "New title" --yes
glab mr update 55 --description "Updated desc" --yes
glab mr update 55 --label "migration,qa" --yes
glab mr update 55 --ready --yes           # remove draft
glab mr update 55 --draft --yes           # mark as draft
glab mr update 55 --assignee @me --yes
glab mr update 55 --reviewer another-user --yes
\`\`\`

### Actions
\`\`\`bash
glab mr approve 55
glab mr merge 55
glab mr close 55
glab mr reopen 55
glab mr note 55 -m "Comment text here"
glab mr checkout 55                       # check out the branch locally
\`\`\`

### Inline comments with file/line positions

\`glab mr view --comments\` does NOT include diff position. Use the GitLab REST API instead:

\`\`\`bash
glab api "projects/YOUR_PROJECT_PATH/merge_requests/55/discussions" \\
  | python3 -c "
import json, sys
data = json.load(sys.stdin)
for d in data:
    for note in d.get('notes', []):
        pos = note.get('position', {})
        print(f'File: {pos.get(\"new_path\")} line {pos.get(\"new_line\")}')
        print(f'{note[\"body\"][:200]}')
        print()
"
\`\`\`

URL-encode the project path: replace / with %2F

---

## Issues

\`\`\`bash
glab issue view 123
glab issue list --assignee=@me
glab issue create --title "Bug: something broken" --description "Details..." --label "bug"
glab issue update 123 --title "Updated title" --yes
glab issue close 123
glab issue note 123 -m "Comment"
\`\`\`

---

## CI/CD Pipelines

\`\`\`bash
glab ci status                        # current branch
glab ci status --live                 # real-time until done
glab ci view                          # interactive TUI
glab ci trace lint                    # trace job logs by name
glab ci run                           # trigger new pipeline
glab ci retry <job-id>
glab ci cancel <pipeline-id>
\`\`\`

---

## Tips

- \`-R OWNER/GROUP/REPO\` — target any repo explicitly
- \`--output json\` — machine-readable output
- \`--yes\` / \`-y\` — skip confirmation prompts
- \`--web\` — open the item in a browser
`,

  acli: `---
name: acli
description: Use acli CLI to interact with Jira and Confluence instead of the Atlassian MCP. Covers workitem create/view/edit/search/transition/comment and confluence page/space read operations.
---

# acli — Atlassian CLI Skill

Use \`acli\` (v1.3.17+) to interact with Jira and Confluence instead of the Atlassian MCP.

## Auth

Auth is persistent via **OAuth (browser login)**. API tokens are blocked by many org admin policies — do NOT attempt \`--token\` auth unless your org allows it.

If a command returns \`unauthorized\`, re-auth via browser:
\`\`\`bash
acli auth login         # opens browser for OAuth
acli auth status
acli jira auth status
acli confluence auth status
\`\`\`

---

## Jira

### View a work item
\`\`\`bash
acli jira workitem view PROJ-123
acli jira workitem view PROJ-123 --fields "key,summary,status,assignee,description"
acli jira workitem view PROJ-123 --fields "*all" --json
\`\`\`

### Search (JQL)
\`\`\`bash
acli jira workitem search --jql "project = PROJ AND status = 'In Progress'" --fields "key,summary,status,assignee"
acli jira workitem search --jql "project = PROJ AND assignee = currentUser()" --limit 20
acli jira workitem search --jql "parent = PROJ-100 AND issuetype = Bug" --json
\`\`\`

### Create a work item
\`\`\`bash
acli jira workitem create \\
  --project "PROJ" \\
  --type "Bug" \\
  --summary "Short description" \\
  --description "Detailed description in plain text" \\
  --assignee "user@domain.com" \\
  --label "bug,backend"

# With parent (subtask)
acli jira workitem create \\
  --project "PROJ" \\
  --type "Subtask" \\
  --summary "Short description" \\
  --parent "PROJ-100" \\
  --assignee "user@domain.com"
\`\`\`

### Edit a work item
\`\`\`bash
acli jira workitem edit --key "PROJ-123" --summary "Updated summary"
acli jira workitem edit --key "PROJ-123" --description "Updated description" --yes
acli jira workitem edit --key "PROJ-123" --assignee "user@domain.com" --yes
acli jira workitem edit --key "PROJ-123" --labels "bug,qa" --yes
\`\`\`

### Transition (change status)
\`\`\`bash
acli jira workitem transition --key "PROJ-123" --status "In Progress" --yes
acli jira workitem transition --key "PROJ-123" --status "Done" --yes
acli jira workitem transition --key "PROJ-123" --status "In Review" --yes
\`\`\`

### Comments
\`\`\`bash
acli jira workitem comment create --key "PROJ-123" --body "Comment text here"
acli jira workitem view PROJ-123 --fields "comment"
\`\`\`

---

## Confluence

> \`acli confluence page\` only supports \`view\` in this version (no create/search via CLI).
> Use page ID from the URL (e.g. \`https://your-domain.atlassian.net/wiki/spaces/SPACE/pages/123456789\`).

### View a page
\`\`\`bash
acli confluence page view --id 123456789

# To read page BODY content (REQUIRED — plain view returns only metadata):
acli confluence page view --id 123456789 --body-format storage --json | python3 -c "
import json, sys, re
data = json.load(sys.stdin)
body = data.get('body', {}).get('storage', {}).get('value', '')
clean = re.sub(r'<[^>]+>', ' ', body)
clean = re.sub(r'\\\\s+', ' ', clean).strip()
print(clean)
"
\`\`\`

### List spaces
\`\`\`bash
acli confluence space list
acli confluence space view --key SPACE
\`\`\`

---

## Output tips

- Add \`--json\` for machine-readable output
- Add \`--fields "key,summary,status"\` to limit returned fields
- Use \`--yes\` / \`-y\` to skip confirmation prompts
- Use \`--limit N\` on search to cap results
`,

  clickup: `---
name: clickup
description: Use the ClickUp REST API via curl to manage tasks, lists, spaces, and comments. Auth via $CLICKUP_API_TOKEN env var. Use /usr/bin/curl directly — rtk intercepts the curl alias.
---

# clickup — ClickUp REST API Skill

Interact with ClickUp via its REST API. Auth token is in \`$CLICKUP_API_TOKEN\`.

## Important: use /usr/bin/curl directly

\`rtk\` intercepts \`curl\`. Always use:
\`\`\`bash
/usr/bin/curl ...
\`\`\`

## Base URL & Auth

\`\`\`
Base URL: https://api.clickup.com/api/v2
Auth:     -H "Authorization: $CLICKUP_API_TOKEN"
\`\`\`

## Find your workspace ID

\`\`\`bash
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/team" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

---

## Tasks

### Get a task
\`\`\`bash
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/task/{task_id}" \\
  | /usr/bin/python3 -m json.tool

# With subtasks
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/task/{task_id}?include_subtasks=true" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

Task IDs are alphanumeric (e.g. \`86e0m00b0\`). Custom IDs (e.g. \`DEV-123\`) are in \`custom_id\` field.

### Search tasks (workspace-wide)
\`\`\`bash
# By text query
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/team/{team_id}/task?query=keyword&include_closed=false" \\
  | /usr/bin/python3 -m json.tool

# Assigned to me
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/team/{team_id}/task?assignees[]={user_id}&include_closed=false" \\
  | /usr/bin/python3 -m json.tool

# Filter by status
/usr/bin/curl -s \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  "https://api.clickup.com/api/v2/team/{team_id}/task?assignees[]={user_id}&statuses[]=in%20progress" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

### Create a task
\`\`\`bash
/usr/bin/curl -s -X POST \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Task name",
    "description": "Task description in plain text",
    "status": "to do",
    "assignees": [{user_id}],
    "priority": 3,
    "tags": ["tag"]
  }' \\
  "https://api.clickup.com/api/v2/list/{list_id}/task" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

Priority values: \`1\` = Urgent, \`2\` = High, \`3\` = Normal, \`4\` = Low

### Update a task
\`\`\`bash
/usr/bin/curl -s -X PUT \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Updated name",
    "status": "in progress",
    "priority": 2
  }' \\
  "https://api.clickup.com/api/v2/task/{task_id}" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

### Add a comment
\`\`\`bash
/usr/bin/curl -s -X POST \\
  -H "Authorization: $CLICKUP_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"comment_text": "Comment text here"}' \\
  "https://api.clickup.com/api/v2/task/{task_id}/comment" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

---

## Tips

- Pipe to \`/usr/bin/python3 -m json.tool\` for readable output
- Task status must match exact strings from the list's workflow (e.g. \`"to do"\`, \`"in progress"\`)
- \`custom_id\` (e.g. \`DEV-123\`) is display-only — use the raw \`id\` field for API calls
- \`include_closed=false\` on list/search endpoints to exclude done tasks
- Timestamps are Unix milliseconds — convert with \`date -r $((ts/1000))\`
`,

  'figma-api': `---
name: figma-api
description: Use the Figma REST API via curl to read files, nodes, components, styles, comments, and export images. Auth via $FIGMA_API_TOKEN env var. Use /usr/bin/curl directly — rtk intercepts the curl alias.
---

# figma-api — Figma REST API Skill

Use the Figma REST API with \`/usr/bin/curl\` for all Figma operations.
Auth token is in \`$FIGMA_API_TOKEN\`.

## Important: use /usr/bin/curl directly

\`rtk\` intercepts the \`curl\` alias. Always use:
\`\`\`bash
/usr/bin/curl ...
\`\`\`

## Base URL & Auth

\`\`\`
Base URL: https://api.figma.com/v1
Auth:     -H "X-Figma-Token: $FIGMA_API_TOKEN"
\`\`\`

## Extract file key from URL

Given: \`https://www.figma.com/design/fHHUiWDSsg0UvRAlrYI70u/File-Name?node-id=26926-2650\`
- **File key**: \`fHHUiWDSsg0UvRAlrYI70u\` (segment after \`/design/\` or \`/file/\`)
- **Node ID**: \`26926-2650\` → use as \`26926:2650\` in API calls (replace \`-\` with \`:\`)

---

## File

### Get specific nodes
\`\`\`bash
# IMPORTANT: Never call GET /files/{key} without ?ids= — returns "Request too large"
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/nodes?ids=26926:2650" \\
  | /usr/bin/python3 -m json.tool

# Multiple nodes (comma-separated)
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/nodes?ids=26926:2650,26926:2877" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

### File versions
\`\`\`bash
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/versions" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

---

## Export images

\`\`\`bash
# Export as PNG (2x)
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/images/{file_key}?ids=26926:2650&format=png&scale=2" \\
  | /usr/bin/python3 -m json.tool

# Export as SVG
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/images/{file_key}?ids=26926:2650&format=svg" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

Response: \`{ "images": { "26926:2650": "<s3-url>" } }\`
The S3 URL expires — fetch the image promptly after getting the URL.

---

## Components & Styles

\`\`\`bash
# List all components in a file
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/components" \\
  | /usr/bin/python3 -m json.tool

# List all styles in a file
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/styles" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

---

## Comments

\`\`\`bash
# List comments
/usr/bin/curl -s \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  "https://api.figma.com/v1/files/{file_key}/comments" \\
  | /usr/bin/python3 -m json.tool

# Post a comment on a node
/usr/bin/curl -s -X POST \\
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Comment text here",
    "client_meta": {
      "node_id": "26926:2650",
      "node_offset": { "x": 0, "y": 0 }
    }
  }' \\
  "https://api.figma.com/v1/files/{file_key}/comments" \\
  | /usr/bin/python3 -m json.tool
\`\`\`

---

## Tips

- **File too large error**: never call \`GET /files/{key}\` without \`?ids=...\` — always filter by node IDs
- **Node ID format**: URLs use \`26926-2650\`, API uses \`26926:2650\` (replace \`-\` with \`:\`)
- Node types: \`CANVAS\`, \`FRAME\`, \`SECTION\`, \`INSTANCE\`, \`COMPONENT\`, \`TEXT\`, \`RECTANGLE\`, \`GROUP\`
- Images endpoint returns S3 URLs — these expire, fetch them promptly
`,

  slite: `---
name: slite
description: Use the Slite REST API via curl to read, create, and update notes/docs. Auth via $SLITE_API_TOKEN env var. Use /usr/bin/curl directly — rtk intercepts the curl alias.
---

# slite — Slite REST API Skill

Interact with Slite via its REST API. Auth token is in \`$SLITE_API_TOKEN\`.

## Important: use /usr/bin/curl directly

\`rtk\` intercepts the \`curl\` alias. Always use:
\`\`\`bash
/usr/bin/curl ...
\`\`\`

## Base URL & Auth

\`\`\`
Base URL: https://api.slite.com/v1
Auth:     -H "x-slite-api-key: $SLITE_API_TOKEN"
\`\`\`

---

## Get a note

\`\`\`bash
/usr/bin/curl -s \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  "https://api.slite.com/v1/notes/{note_id}"
\`\`\`

Response includes: \`id\`, \`title\`, \`parentNoteId\`, \`url\`, \`content\`, \`updatedAt\`, \`archivedAt\`

---

## List notes (by parent)

\`\`\`bash
# All children of a parent note
/usr/bin/curl -s \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  "https://api.slite.com/v1/notes?parentNoteId={parent_id}"

# All notes (paginated)
/usr/bin/curl -s \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  "https://api.slite.com/v1/notes"
\`\`\`

Response: \`{ notes: [...], nextCursor, hasNextPage, total }\`

---

## Create a note

\`\`\`bash
/usr/bin/curl -s -X POST \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Note title",
    "parentNoteId": "{parent_id}",
    "markdown": "## Section\\n\\nContent here."
  }' \\
  "https://api.slite.com/v1/notes"
\`\`\`

---

## Update a note

\`\`\`bash
/usr/bin/curl -s -X PUT \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated title",
    "markdown": "## Updated content\\n\\nNew body."
  }' \\
  "https://api.slite.com/v1/notes/{note_id}"
\`\`\`

Partial updates are supported — include only what you want to change.

---

## Delete a note

\`\`\`bash
/usr/bin/curl -s -X DELETE \\
  -H "x-slite-api-key: $SLITE_API_TOKEN" \\
  "https://api.slite.com/v1/notes/{note_id}"
\`\`\`

Returns empty body on success (HTTP 200).

---

## Important: write vs read fields

- GET returns content in the \`content\` field (read only)
- POST/PUT always use \`"markdown"\` — NOT \`"content"\`
- Using \`"content"\` on PUT silently succeeds but leaves the note empty

## Limitations

- No search endpoint — browse by \`parentNoteId\` or list all and filter client-side
- \`DELETE\` returns an empty body — check HTTP status, not response body
`,
}
