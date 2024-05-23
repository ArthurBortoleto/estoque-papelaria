import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import AppProvider from "./src/context";
import SignUp from "./src/screens/SignUp";
import Profile from "./src/screens/Profile";
import Home from "./src/screens/Home";

export default function App() {
    return(
        <NavigationContainer>
            <AppProvider>
                <Home />
            </AppProvider>
        </NavigationContainer>
    );
}