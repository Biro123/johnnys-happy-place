import { useState } from 'react';
import { useEasybase } from 'easybase-react';

const classes = {
  authButton: {
    position: 'absolute',
    top: '10px',
    right: '50px',
    width: '100px',
    height: '50px',
    fontSize: '15px'
  },
  authDialog: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.7)',
    transition: 'opacity 500ms',
    visibility: 'hidden',
    opacity: '0'
  },
  authDialogOpen: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.7)',
    transition: 'opacity 500ms',
    visibility: 'visible',
    opacity: '1'
  },
  authDialogLayout: {
    margin: '70px auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '400px',
    position: 'relative',
    transition: 'all 5s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogInput: {
    fontSize: '20px',
    padding: '3px',
    margin: '10px',
    marginRight: '10px', 
    marginTop: '14px', 
    fontSize: '16px'
  }
}

const AuthButton = () => {

  const {
    isUserSignedIn,
    signIn,
    signOut,
    signUp
  } = useEasybase();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onAuthButtonClick = () => {
    if (isUserSignedIn()) {
      signOut();
    } else {
      setDialogOpen(true);
    }
  }

  const onSignInClick = async () => {
    console.log('signin clicked');
    const res = await signIn(usernameValue, passwordValue);
    console.log('signin resp');
    console.log(res);
    if (res.success) {
      setDialogOpen(false);
      setUsernameValue('');
      setPasswordValue('');
    }
  }

  const onSignUpClick = async () => {
    console.log('signup clicked');
    const res = await signUp(usernameValue, passwordValue);
    console.log(res);
    if (res.success) {
      await signIn(usernameValue, passwordValue);
      setDialogOpen('');
      setUsernameValue('');
      setPasswordValue('');
    }
  }

  return (
    <>
      <button onClick={onAuthButtonClick} style={classes.authButton}>
        {isUserSignedIn() ? "Sign Out" : "Sign In"}
      </button>
      <div style={dialogOpen ? classes.authDialogOpen : classes.authDialog}>
        <div style={classes.authDialogLayout}>
            <input style={classes.dialogInput} type="text" placeholder="Username" value={usernameValue} 
              onChange={e => setUsernameValue(e.target.value)} />
            <input style={classes.dialogInput} type="password" placeholder="Password" value={passwordValue} 
              onChange={e => setPasswordValue(e.target.value)} />
            <div>
              <button style={{ marginRight: 10, marginTop: 14, fontSize: 16 }} onClick={onSignInClick}>Sign In</button>
              <button style={{ marginRight: 10, marginTop: 14, fontSize: 16 }} onClick={onSignUpClick}>Sign Up</button>
            </div>
        </div>
      </div>
    </>
  )

}
export default AuthButton;