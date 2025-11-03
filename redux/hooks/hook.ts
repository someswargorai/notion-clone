import { dispatch, selector } from "../store";
import {useSelector, useDispatch} from 'react-redux';

export const useAppSelector= useSelector.withTypes<selector>();
export const useAppDispatch= useDispatch.withTypes<dispatch>();