#!/usr/bin/env zsh
set -euo pipefail

BASE_DIR="/Users/ReDL/Documents/Universty/Teaching/Projects/Practices/2026 (3)/React"
SOURCE_REPO="$BASE_DIR/cs31-minesweeper-react-2026"

# Target repo -> team slug that must appear in the access instructions.
typeset -A TARGET_REPOS
TARGET_REPOS=(
  "$BASE_DIR/cs32-minesweeper-react-2026" "cs-32"
)

SOURCE_TEAM="cs-31"
COMMIT_MESSAGE="chore: sync .github config from cs31-minesweeper-react-2026"

# Snapshot .github into a temp directory BEFORE touching any repo.
# This ensures the source is never affected by rm -rf in the loop.
SNAPSHOT_DIR=$(mktemp -d)
cp -r "$SOURCE_REPO/.github/." "$SNAPSHOT_DIR/"
CODERABBIT_SNAPSHOT=$(mktemp)
cp "$SOURCE_REPO/.coderabbit.yaml" "$CODERABBIT_SNAPSHOT"
echo "Snapshot created at: $SNAPSHOT_DIR"

sync_repo() {
  local repoPath="$1"
  local teamSlug="$2"
  local repoName="${repoPath:t}"

  echo ""
  echo "========================================="
  echo "Syncing: $repoName"
  echo "========================================="

  if [[ ! -d "$repoPath" ]]; then
    echo "ERROR: Directory not found: $repoPath"
    return 1
  fi

  pushd "$repoPath" > /dev/null

  echo "→ Switching to main branch..."
  git checkout main

  echo "→ Pulling latest changes..."
  git pull origin main

  echo "→ Copying .github folder..."
  rm -rf ".github"
  cp -r "$SNAPSHOT_DIR" ".github"

  # The access instructions name the team of the repo they live in.
  echo "→ Adjusting team slug ($SOURCE_TEAM → $teamSlug)..."
  sed -i '' "s/$SOURCE_TEAM/$teamSlug/g" ".github/copilot-instructions.md"

  echo "→ Copying .coderabbit.yaml..."
  cp "$CODERABBIT_SNAPSHOT" ".coderabbit.yaml"

  echo "→ Staging changes..."
  git add .github .coderabbit.yaml

  if git diff --cached --quiet; then
    echo "→ No changes detected, skipping commit."
  else
    echo "→ Committing..."
    git commit -m "$COMMIT_MESSAGE"

    echo "→ Pushing..."
    git push origin main
  fi

  popd > /dev/null
  echo "Done: $repoName"
}

for repoPath teamSlug in "${(@kv)TARGET_REPOS}"; do
  sync_repo "$repoPath" "$teamSlug"
done

rm -rf "$SNAPSHOT_DIR" "$CODERABBIT_SNAPSHOT"

echo ""
echo "========================================="
echo "All repos synced successfully."
echo "========================================="
