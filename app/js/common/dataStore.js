/**
 * Created by yzsoft on 16/6/29.
 */
let session = window.sessionStorage;
let local = window.localStorage;

export const handleSession = {
    set: (key, value)=> {
        let valueType = typeof value;
        if(valueType=='object'){
            value=JSON.stringify(value)
        }
        session.setItem(key,value);
    },
    get: (key)=> {
        let value=session.getItem(key);
        try{
            value =JSON.parse(value)
        }catch (error){
            console.log(error);
        }

        return value;
    },
    remove:(key)=>{
        session.removeItem('key');
    }
};
export const handleStorage={
    set: (key, value)=> {
        let valueType = typeof value;
        if(valueType=='object'){
            value=JSON.stringify(value)
        }
        local.setItem(key,value);
    },
    get: (key)=> {
        let value=local.getItem(key);
        try{
            value =JSON.parse(value)
        }catch (error){
            console.log(error);
        }
        return value;
    },
    remove(key){
        local.removeItem('data')
    }
};