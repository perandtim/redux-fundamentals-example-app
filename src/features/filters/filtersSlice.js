export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const initialState = {
    filters: {
        status: StatusFilters.All,
        colors: []
    }
}

export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/statusFilterChanged' : {
            return {
                ...state,
                status: action.payload.filterValue
            }
        }
        case 'filters/colorFilterChanged' : {
            let { color, changeType } = action.payload // w00t destructuring
            const { colors } = state // colors = state.colors

            switch (changeType) {
                case 'added': {
                    if (colors.includes(color)) {
                        return state
                    }

                    return {
                        ...state,
                        colors: state.colors.concat(color)
                    }
                }
                case 'removed': {
                    if (!colors.includes(color)) {
                        return state
                    }
                    return {
                        ...state,
                        colors: state.colors.filter(el => el !== color)
                    }
                }
                default:
                    // return existing state unchanged
                    return state
            }
        }
    }
}