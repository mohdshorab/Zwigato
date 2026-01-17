import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

//Its create a version of useSelector that always knows our RootState structure.
// Now, when we use it in components, we get autocomplete and error-checking automatically.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// We use <AppDispatch> to tell TypeScript: "This dispatch is allowed to handle Async/Thunks."
// Without this, TypeScript would show an error whenever we try to fetch data from an API.
export const useAppDispatch = () => useDispatch<AppDispatch>();