// session back/forward stack (not the same as visit history in the db)

export type NavigationEntry = {
  address: string;
  title: string;
};

export type NavigationState = {
  stack: NavigationEntry[];
  index: number;
};

export function createNavigationState(): NavigationState {
  return { stack: [], index: -1 };
}

export function currentEntry(state: NavigationState): NavigationEntry | null {
  if (state.index < 0 || state.index >= state.stack.length) {
    return null;
  }
  return state.stack[state.index];
}

// new nav clears anything ahead (same as a real browser)
export function navigateTo(
  state: NavigationState,
  entry: NavigationEntry,
): NavigationState {
  const stack = state.stack.slice(0, state.index + 1);
  stack.push(entry);
  return { stack, index: stack.length - 1 };
}

export function goBack(state: NavigationState): NavigationState {
  if (state.index <= 0) {
    return state;
  }
  return { ...state, index: state.index - 1 };
}

export function goForward(state: NavigationState): NavigationState {
  if (state.index >= state.stack.length - 1) {
    return state;
  }
  return { ...state, index: state.index + 1 };
}

export function canGoBack(state: NavigationState): boolean {
  return state.index > 0;
}

export function canGoForward(state: NavigationState): boolean {
  return state.index >= 0 && state.index < state.stack.length - 1;
}
