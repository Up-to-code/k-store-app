
import {  ActivityIndicator, View } from 'react-native';

const LoadingPage = () => {
    return (
        <View  className='flex-1 justify-center items-center'>
             <ActivityIndicator size="large" color={"blue"} />
        </View>
    );
}


export default LoadingPage;
