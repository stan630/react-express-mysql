import { useRef, useState, useEffect } from "react";
import { faCheck,faTimes,faInfoCircle,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "./api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:8000/register'

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user)) ;
    console.log(user);
    }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch (pwd === matchPwd) ;
    }, [pwd, matchPwd]);

  useEffect(() => {
      setErrMsg("");
    },[ user,pwd,matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd}),
            {
                headers: { 'Content-Type' : 'application/json'},
                withCredentials: true
            })
            console.log(response?.data)
            console.log(JSON.stringify(response))
            setSuccess(true)
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">{errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="usernme"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Both passwords must match!
            </p>

            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
      </form>
      <p>
        Already registered?<br />
        <span className="line">
            {/* put router link here */}
            <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default Register;
