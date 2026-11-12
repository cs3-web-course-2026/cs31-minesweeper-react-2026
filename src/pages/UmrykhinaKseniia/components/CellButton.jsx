.game {
  --cell-size: 2.5rem;
  --cell-number-1: #4f9cf9;
  --cell-number-2: #4fc27a;
  --cell-number-3: #e0524f;
  --cell-number-4: #9b6bf2;
  --cell-number-5: #e08a3c;
  --cell-number-6: #3cc4c4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
}

.title {
  margin: 0;
  color: var(--color-text);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface-1, rgb(255 255 255 / 6%));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.statusBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.hint {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

@media (width <= 480px) {
  .game {
    --cell-size: 1.9rem;
  }
}
