'use client'
import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import useStore from "@/store"
import AlertError from "../AlertError"
import SpinnerModal from "../SpinnerModal"
import { validationForWord } from "@/lib/functions/myValidation"
import { IconPencil } from "@tabler/icons-react"

const UpdateName = ({
    apiUrl,
}:{
    apiUrl:string
}) => {
    const router = useRouter();
    const {user} = useStore();
    const updateUser = useStore((state) => state.updateUser);
    const resetUser = useStore((state) => state.resetUser);
    const [loadingFlag,setLoadingFlag] = useState(false);
    const [error,setError] = useState('');
    const [nameError,setNameError] = useState('');
    const nameInput = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingFlag(true);//ローディング状態でボタンを非活性に
        if(error)setError('');
    
        ///////////
        //◆【nameDataのバリデーション】
        const currentNameInput = nameInput.current as HTMLInputElement;
        const currentName = currentNameInput.value;
        if(user.name===currentName){
            setLoadingFlag(false);
            return;
        }
        //name
        const {result,message} = validationForWord(currentName,20);
        if( !result ){
            setNameError(message)
            setError('入力内容に問題があります');
            setLoadingFlag(false);
            return alert('入力内容に問題があります');
        }

        //////////
        //◆【通信】
        try {
            await axios.put(
                `${apiUrl}/user`,
                {
                    name:currentName,
                }
            );
            updateUser({...user,name:currentName});
            alert('success');
        } catch (err) { 
            let message = 'Something went wrong. Please try again.';
            if (axios.isAxiosError(err)) {
                if(err.response?.data.message)message = err.response.data.message;
                //401,Authentication failed.
                if(err.response?.status && err.response.status===401){
                    setLoadingFlag(false);
                    alert(message);
                    resetUser();
                    router.push('/auth');
                    return;
                }
            } else if (err instanceof Error) {
                message = err.message;
            }
            alert(message);
            setError(message);
        }
        setLoadingFlag(false);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full mx-1 sm:mx-3">
            {loadingFlag && <SpinnerModal/>}
            {error && (
                <div className='py-3'>
                    <AlertError errMessage={error} reloadBtFlag={false}/>
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl">
                <div className="mb-4">
                    <label className='block text-gray-700 text-md font-bold'>name<em className="text-red-500">*</em></label>
                    <span className='text-xs text-gray-500'>100字以内のタイトル</span>
                    <input
                        name='name'
                        ref={nameInput}
                        defaultValue={user.name}
                        type='text'
                        required={true}
                        placeholder="タイトル"
                        className={`
                            ${nameError&&'border-red-500'}
                            bg-gray-100 shadow appearance-none break-all border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                        `}
                    />
                    {nameError && <span className='text-red-500 text-xs italic'>{nameError}</span>}
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className={
                            `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
                            ${loadingFlag&&'cursor-not-allowed'}
                        `}
                        disabled={loadingFlag}
                    >
                        <span className="flex items-center">
                            {loadingFlag?'・・Loading・・': <><IconPencil/>update</>}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateName;
