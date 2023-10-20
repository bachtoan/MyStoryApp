import React, { useEffect } from "react";
import { createContext, useState } from "react";
import * as Notifications from 'expo-notifications';

export const ContextAPI = createContext();

export const APIProvider = ({ children }) => {
    const [screen, setScreen] = useState("");
    const [locations, setLocations] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [author, setAuthor] = useState("");
    const [illustration, setIllustration] = useState("");
    // useEffect(() => {
    //     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    //         setScreen(response.notification.request.content.data.screen)
    //         console.log("response:",response.notification.request.content.data.id);
    //         setId(response.notification.request.content.data.id)
    //         setName(response.notification.request.content.data.name)
    //         setAuthor(response.notification.request.content.data.author)
    //         setIllustration(response.notification.request.content.data.illustration)
    //     });
    
    //     return () => {
    //       responseListener.remove();
    //     };
    //   }, []);
    
    return (
        <ContextAPI.Provider
            value={{
                screen,
                name,
                author,
                illustration,
                id,
                locations,
                setLocations,
                setScreen,
                setId,
                setName,
                setAuthor,
                setIllustration
            }}>
            {children}
        </ContextAPI.Provider>
    )

}
