export const checkValidity =( value, rules )=>{
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
}


export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const postValidation=(postData)=>{
    let valid=false;
    if(postData.title !=='' && postData.content !=='' && postData.description !==''){
        valid=true
    }
    return valid;
}