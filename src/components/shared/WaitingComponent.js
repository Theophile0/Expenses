import react from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'



const WaitingComponent = (props) =>{
    const {animating} = props;
    const theme = useTheme();
    return(
        <ActivityIndicator animating={true} color={theme.colors.onBackground}/>
    );
};

export default WaitingComponent;