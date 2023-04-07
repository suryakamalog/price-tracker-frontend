import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector } from "react-redux";
import TaskLoader from "./TaskLoader";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const access_token = useSelector((state) => state.auth.access_token);
    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !access_token ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(access_token)}`)
    // }, [isLoading])

    return (
        <>
            { isLoading
                    ? <TaskLoader />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin