import {CellValueType, ColumnConfig, FilterMode, HttpRequest} from './types';

export const executeHttpRequest = async (req: HttpRequest) => {
    try {
        let response = await fetch(req.url, req.options);
        return await response.json();
    } catch (e) {
        console.error('Unable to fetch from ' + req.url, e)
    }
}

export const getSortingFnForColumn = (column: ColumnConfig<any>, sortDirection: 'asc' | 'desc') => {
    let {sort, label} = column;
    let columnSortFn: (a: any, b: any) => number;
    if (typeof sort === 'function') {
        columnSortFn = sort;
    } else {
        switch (sort) {
            case 'as-boolean':
                columnSortFn = booleanCmp;
                break;
            case 'as-text':
                columnSortFn = textCmp;
                break;
            case 'as-number':
                columnSortFn = numberCmp;
                break;
            case 'as-date':
                columnSortFn = dateCmp;
                break;
            default:
                columnSortFn = textCmp;
                break;
        }
    }

    if (!columnSortFn) {
        console.error('Invalid sort function for column ' + label)
        return undefined;
    }

    return sortDirection === 'asc' ? columnSortFn : (a: any, b: any) => columnSortFn(b, a);
}

export const booleanCmp = (a: any, b: any) => {
    let _a = !!a ? 1 : 0;
    let _b = !!b ? 1 : 0;
    return _a - _b;
}

export const textCmp = (a: any, b: any) => {
    let _a = String(a);
    let _b = String(b);
    return _a.localeCompare(_b);
}

export const numberCmp = (a: any, b: any) => {
    let _a = parseFloat(a);
    let _b = parseFloat(b);

    if (isNaN(_a)) {
        if (isNaN(_b)) {
            return 0;
        } else {
            return -1;
        }
    } else {
        if (isNaN(b)) {
            return 1;
        } else {
            return _a - _b;
        }
    }
}

export const dateCmp = (a: any, b: any) => {
    let _a = new Date(a);
    let _b = new Date(b);

    if (typeof _a !== 'object') {
        if (typeof _b !== 'object') {
            return 0;
        } else {
            return -1;
        }
    } else {
        if (typeof _b !== 'object') {
            return 1;
        } else {
            return _a.getMilliseconds() - _b.getMilliseconds();
        }
    }
}

export const getFilterFnForColumn = (column: ColumnConfig<any>, filterMode: FilterMode) => {
    let filterFn: (el: any) => boolean;
    let {condition, referenceValue} = filterMode;
    let {filter} = column;

    switch (filter) {
        case 'as-boolean':
            filterFn = filterBooleanFn(referenceValue);
            break;
        case 'as-text':
            filterFn = filterTextFn(referenceValue);
            break;
        case 'as-number':
            filterFn = filterNumberFn(referenceValue, condition);
            break;
        case 'as-date':
            filterFn = filterDateFn(referenceValue, condition);
            break;
        default:
            filterFn = filterTextFn(referenceValue);
            break;
    }

    return filterFn;
}

export const filterBooleanFn = (ref: CellValueType) => {
    if (typeof ref !== 'boolean')
        return () => false;
    return (el: any) => typeof el === 'boolean' ? el === ref : false;
}

export const filterTextFn = (ref: CellValueType) => {
    return (el: any) => String(el).includes(String(ref));
}

export const filterNumberFn = (ref: CellValueType, condition: 'le' | 'ge' | 'eq') => {
    let filterFn: (el: any) => boolean;
    let _referenceValue = parseFloat(String(ref));
    if (isNaN(_referenceValue)) {
        filterFn = () => false;
    } else {
        switch (condition) {
            case 'eq':
                filterFn = (el: any) =>
                    isNaN(parseFloat(el)) ?
                        false :
                        (parseFloat(el) === _referenceValue);
                break;
            case 'ge':
                filterFn = (el: any) =>
                    isNaN(parseFloat(el)) ?
                        false :
                        (parseFloat(el) >= _referenceValue);
                break;
            case 'le':
                filterFn = (el: any) =>
                    isNaN(parseFloat(el)) ?
                        false :
                        (parseFloat(el) <= _referenceValue);
                break;
            default:
                filterFn = () => true;
                break;
        }
    }
    return filterFn;
}

export const filterDateFn = (ref: CellValueType, condition: 'le' | 'ge' | 'eq') => {
    let refDate = new Date(String(ref));
    if(typeof refDate !== 'object')
      return () => false;

    return (el: any) => {
      let elDate = new Date(String(el));
      if(typeof elDate !== 'object')
        return false;
      switch (condition) {
        case "eq":
          return dateCmp(el, ref) === 0;
        case "ge":
          return dateCmp(el, ref) >= 0;
        case "le":
          return dateCmp(el, ref) <= 0;
      }
      return false;
    };
}
