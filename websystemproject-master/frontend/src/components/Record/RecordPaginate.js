import _ from 'lodash';

export function recordPaginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}