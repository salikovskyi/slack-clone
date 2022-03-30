import {auth, provider} from '../../firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export default function Login({setUser}) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            const newUser = {
                name: result.user.displayName,
                photo: result.user.photoURL,
            }
            console.log(result);
            localStorage.setItem("user", JSON.stringify(newUser))
            setUser(newUser);
            navigate('/')
        })
    }
    return(
        <div className='loginPage'>
            <p className='loginPageText'>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}