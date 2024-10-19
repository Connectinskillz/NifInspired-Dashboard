

// Calculates and return the number of paginated sets formed
export const Paginated = (list,PAGINATION) =>{        
    var result = list.length
    if (result%PAGINATION === 0){
        result = result/PAGINATION
    }
    else{
        result = (((result-result%PAGINATION)+PAGINATION)/PAGINATION)
    }
    return result;
}      

// Returns a list of paginated data to be displayed per set.
export const GetPaginatedData = (Start,PAGINATION,List) =>{
    var paginatedData = [];        
    var End = 0
    Start = ((Start+1) -1) * PAGINATION
    if ((List.length - Start) > PAGINATION){
        End = Start + PAGINATION
    }                
    else{
        End = List.length
    }              
    for (var i =Start ; i<End; i++){
        paginatedData.push(List[i])
    }
    return paginatedData;
}