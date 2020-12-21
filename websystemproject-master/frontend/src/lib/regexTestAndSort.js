
export function handleCheckID(id){
    const regex = /^[a-zA-Z0-9]{5,10}$/g;
    return regex.test(id);
}

export function handleCheckPW(pw){
    const regex =new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$");
    return regex.test(pw);
}

export function handleCheckName(name){
    const regex = /^[가-힣]{2,4}$/;
    return regex.test(name);
}

export function sortOld(records){
    const sortedRecord = records.sort(function(a,b){
        let tempA = a.date+a.time;
        let tempB=   b.date+b.time;
        return  tempA<tempB ?  -1 : tempA  > tempB ? 1:0;
    });

    return sortedRecord
}

export function sortNew(records){
    const sortedRecord = records.sort(function(a,b){
        let tempA = a.date+a.time;
        let tempB=   b.date+b.time;
        return  tempA>tempB ?  -1 : tempA  < tempB ? 1:0;
    });

    return sortedRecord
}
export default {
    handleCheckID,
    handleCheckPW,
    handleCheckName,
    sortOld,
    sortNew,
}