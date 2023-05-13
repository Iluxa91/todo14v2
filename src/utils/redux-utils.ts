import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {AppDispatchType, AppRootStateType} from "./types"
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector