import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataLocal = async (id, isLike) =>{
    try {
        item = {'id' : id, 'isLike' : isLike};
        const jsonValue = JSON.stringify(item)
        await AsyncStorage.setItem(`@storage_item${id}`, jsonValue)
    } catch (e) {
        console.log(`Error:${e}`)
    }
}

export const getDataLocal = async (id, callback) =>{
    try {
        const jsonValue = await AsyncStorage.getItem(`@storage_item${id}`)
        const value = JSON.parse(jsonValue);
        callback(value);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

export const storeDataUser = async (value) => {
    try {       
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        console.log(`Error:${e}`)
    }
}

export const getDataUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        return jsonValue;
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

export const isLoginFb = async(value) =>{
    try {
        item={'isLoginFb' : value};
        const jsonValue = JSON.stringify(item)  
        await AsyncStorage.setItem('isLoginFb', jsonValue)
    } catch (e) {
        console.log(`Error:${e}`)
    }
}

export const getLoginFb = async (callback) => {
    try {
        const jsonValue = await AsyncStorage.getItem('isLoginFb');
        const value =  JSON.parse(jsonValue);
        callback(value)
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}