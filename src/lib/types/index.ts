//////////
//■[ 認証 ]
export type AuthUser = {
    id:number
    name:string
}

//////////
//■[ ServerActions ]
export interface SignUpFormState {
    message:string
    data:{
        name:{
            value:string
            error:string
        }
        email:{
            value:string
            error:string
        }
        password:{
            value:string
            error:string
        }
    }
}
export interface SignInFormState {
    message:string
    data:{
        email:{
            value:string
            error:string
        }
        password:{
            value:string
            error:string
        }
    }
}
export interface MailAuthFormState {
    message:string
    data:{
        email:{
            value:string
            error:string
        }
        authenticationPassword:{
            value:string
            error:string
        }
    }
}

//////////
//■[ PostForm ]
export type PostForm = {
    title:[string,string]//値,err文字
    description:[string,string]//値,err文字
}
export type MarkdownForm = {
    content:[string,string]//値,err文字
}
