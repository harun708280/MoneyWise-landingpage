import { useGetUserByEmailQuery } from "@/redux/Api/userApi";


const useUserByEmail = (email) => {
    const { data: user, isLoading, isError, error } = useGetUserByEmailQuery(email, { skip: !email });

    return { user, isLoading, isError, error };
};

export default useUserByEmail;