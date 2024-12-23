import Link from 'next/link'
import UserIcon from './UserIcon'

const Header = async() => {
    return (<header className='bg-slate-300 max-w-full p-3'>
        <div className='flex items-center justify-between container mx-auto max-w-screen-lg'>
            <div>
                <Link 
                    href='/'
                    className='inline-block font-bold px-2.5 py-1 text-blue-600 hover:text-blue-400 text-md sm:text-2xl'
                >
                    EmailVerification
                </Link>                
            </div>
            <div>
                <UserIcon/>
            </div>            
        </div>
    </header>)
}
export default Header;
