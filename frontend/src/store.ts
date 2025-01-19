import { create } from 'zustand';

export interface AppState {
  categoryFocus: 'communities' | 'items'
  setCategoryFocus: (category: 'communities' | 'items') => void
  mapListFocus: 'map' | 'list'
  setMapListFocus: (mapListFocus: 'map' | 'list') => void
  userLocation: {
    latitude: number
    longitude: number
  }
  setUserLocation: (userLocation: AppState["userLocation"]) => void
  mapPermissionsStatus: 'granted' | 'denied' | 'prompt'
  setMapPermissionsStatus: (mapPermissionsStatus: 'granted' | 'denied' | 'prompt') => void
  // todos: Todo[]
  // addTodo: (title: string, description: string) => void
  // cancelTodo: (id: string) => void
  // completeTodo: (id: string) => void
  // updateTodo: (id: string, newTitle: string, newDescription: string) => void
}

export const useAppStore = create<AppState>()((set) => ({
  categoryFocus: 'items',
  setCategoryFocus: (category) => set({ categoryFocus: category }),
  mapListFocus: 'map',
  setMapListFocus: (mapListFocus) => set({ mapListFocus }),
  userLocation: {
    latitude: 22.54992,
    longitude: 0,
  },
  setUserLocation: (userLocation) => set({ userLocation }),
  mapPermissionsStatus: 'prompt',
  setMapPermissionsStatus: (mapPermissionsStatus) => set({ mapPermissionsStatus }),
  // todos: [...TODO_EXAMPLE],
  // addTodo: (title, description) =>
  //   set((state) => ({
  //     todos: [
  //       ...state.todos,
  //       {
  //         id: uuidv4(),
  //         title: title,
  //         description: description,
  //         todoStatus: 'incomplete',
  //         timeAdded: new Date()
  //       },
  //     ],
  //   })),
  // cancelTodo: (id) => {
  //   set((state) => {
  //     const current = [...state.todos];
  //     const toCancelTodo = current.find((todo) => todo.id === id);
  //     if (toCancelTodo === undefined) {
  //       throw new Error(`Todo with id '${id}' does not exist`);
  //     }
  //     toCancelTodo.todoStatus = 'cancelled';
  //     return {
  //       todos: current,
  //     };
  //   });
  // },
  // completeTodo: (id) => {
  //   set((state) => {
  //     const current = [...state.todos];
  //     const toCompleteTodo = current.find((todo) => todo.id === id);
  //     if (toCompleteTodo === undefined) {
  //       throw new Error(`Todo with id '${id}' does not exist`);
  //     }
  //     toCompleteTodo.todoStatus = 'complete';
  //     return {
  //       todos: current,
  //     };
  //   });
  // },
  // updateTodo: (id, newTitle, newDescription) => {
  //   set((state) => {
  //     const current = [...state.todos];
  //     const toUpdateTodo = current.find((todo) => todo.id === id);
  //     if (toUpdateTodo === undefined) {
  //       throw new Error(`Todo with id '${id}' does not exist`);
  //     }
  //     toUpdateTodo.title = newTitle;
  //     toUpdateTodo.description = newDescription;
  //     return {
  //       todos: current,
  //     };
  //   });
  // },
}));
