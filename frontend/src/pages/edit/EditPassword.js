/* eslint-disable no-useless-escape */
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import './scss/EditPassword.scss'
import corr from './images/corr.png'
import incorr from './images/incorr.png'
import { useState } from "react";
import CustomAxios from "../../CustomAxios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from 'sweetalert2';


const EditPassword = ({ user }) => {
  const history = useHistory()

  const [checkedCurrent, setCheckedCurrent] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const checkCurrentPassword = e => {
    e.preventDefault()
    // ๐จ๐จํ์ฌ ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋์ง ์์ฒญ์ post๐จ๐จ
    CustomAxios({
      method: 'post',
      url: `/api_be/auth/user/pw`,
      withCredentials: true,
      data: {email: user.sub, password: currentPassword},
    })
    .then(() => {
      Swal.fire({
        text: '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํฉ๋๋ค',
        icon: 'success',
        confirmButtonText: 'ํ์ธ',
        confirmButtonColor: 'green'
      }).then(() => setCheckedCurrent(true))
    })
    .catch(() => {
      Swal.fire({
        text: '๋น๋ฐ๋ฒํธ๊ฐ ํ๋ ธ์ต๋๋ค',
        icon: 'error',
        confirmButtonText: 'ํ์ธ',
        confirmButtonColor: 'red'
      })
    })
  }


  const [credentials, setCredentials] = useState({ password: '', passwordConf: '' })
  const [validData, setValidData] = useState({ password: null, passwordConf: null })
  const [hover, setHover] = useState({ password: false, passwordConf: false })

  const validator = function(target){
    if (target ==='password') {
      const passValidator = /[0-9a-zA-Z~!@#$%^&*()_+-=[\]{};\':",\\|.\/<>?]{8,16}/
      const result = passValidator.exec(credentials.password)
      if (!credentials.password){
        setValidData({...validData, password: null})
      }
      else if (result && result[0] === credentials.password){
        setValidData({...validData, password: 1})
      }
      else {
        setValidData({...validData, password: -1})
      }
    }
    else if (target === 'passwordConf') {
      if (!credentials.passwordConf){
        setValidData({...validData, passwordConf: null})
      }
      else if (credentials.password === credentials.passwordConf){
        setValidData({...validData, passwordConf: 1})
      }
      else {
        setValidData({...validData, passwordConf: -1})
      }
    }
  }

  const isValid = function(){
    return new Promise((resolve, reject) =>{
      for (const key in validData){
        if (validData[key] !== 1){
          reject('์๋ ฅ ์ ๋ณด๊ฐ ์ ํจํ์ง ์์ต๋๋ค')
        }
      }
      resolve()
    })
  } 

  const changePassword = e => {
    e.preventDefault()
    isValid()
    .then(() => {
      // ๐จ๐จ๋น๋ฐ๋ฒํธ๊ฐ ์ ํจํ๋ฉด password๋ง ๋ด์์ ๋ณ๊ฒฝ ์์ฒญ(put) ๋ณด๋ด๊ธฐ
      CustomAxios({
        method: 'put',
        url: `/api_be/auth/user/pw`,
        withCredentials: true,
        data: {email: user.sub, password: credentials.password},
      })
      .then(() => {
        Swal.fire({
          text: '๋น๋ฐ๋ฒํธ๊ฐ ๋ณ๊ฒฝ๋์์ต๋๋ค',
          icon: 'success',
          confirmButtonText: 'ํ์ธ',
          confirmButtonColor: 'green'
        }).then(() => history.push('/mypage'))
      })
    })
    .catch(err => {
      alert(err)
    })
  }



  return (
    <>
      <NavigationBar boldPath="MYPAGE" />
      <article className="edit-password">
        <section className="left">
          {/* ํ์ฌ ๋น๋ฐ๋ฒํธ ํ์ธ */}
          <form onSubmit={(e) => checkCurrentPassword(e)}>
            <label className="input-form" htmlFor="current">
              <div className="label-text">ํ์ฌ ๋น๋ฐ๋ฒํธ</div>
              <div className="current-box">
                <input className={`input-box ${checkedCurrent && 'color-box'}`} type="password" id="current" value={currentPassword}
                  placeholder="๋ณ๊ฒฝ ์  ๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํ์ธ์" autoFocus disabled={checkedCurrent}
                  onChange={(e) => setCurrentPassword(e.target.value)} />
                <button><span /><p>ํ์ธ</p></button>
              </div>
            </label>
          </form>
          <form onSubmit={(e) => changePassword(e)}>
            <label className="input-form" htmlFor="password">
              <div className="label-text">๋ณ๊ฒฝํ  ๋น๋ฐ๋ฒํธ</div>
              <div className="input-box">
                <input type="password" id="password" value={credentials.password} disabled={!checkedCurrent}
                  placeholder="๋น๋ฐ๋ฒํธ๋ 8 ~ 16๊ธ์, ํน์๋ฌธ์, ์์ด, ์ซ์ 1๊ฐ ์ด์ ํฌํจํด์ผ ํฉ๋๋ค"
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  onBlur={() => validator('password')} />
                <img className="validator-helper" src={validData.password === 1 ? corr : incorr} alt='helper'
                  style={{display: validData.password ? 'block' : 'none'}}
                  onMouseOver={() => setHover({...hover, password: true})}
                  onMouseDown={() => setHover({...hover, password: false})} />
              </div>
            </label>
            <label className="input-form" htmlFor="passwordConf">
              <div className="label-text">๋ณ๊ฒฝํ  ๋น๋ฐ๋ฒํธ ํ์ธ</div>
              <div className="input-box">
                <input type="password" id="passwordConf" value={credentials.passwordConf}
                  placeholder="๋น๋ฐ๋ฒํธ๋ฅผ ๋ค์ ์๋ ฅํ์ธ์" disabled={!checkedCurrent}
                  onChange={(e) => setCredentials({...credentials, passwordConf: e.target.value})}
                  onBlur={() => validator('passwordConf')} />
                <img className="validator-helper" src={validData.passwordConf === 1 ? corr : incorr} alt='helper'
                  style={{display: validData.passwordConf ? 'block' : 'none'}}
                  onMouseOver={() => setHover({...hover, passwordConf: true})}
                  onMouseDown={() => setHover({...hover, passwordConf: false})} />
              </div>
            </label>
            <button className="change-password-btn"><span /><p>๋น๋ฐ๋ฒํธ ๋ณ๊ฒฝ</p></button>
          </form>
        </section>
        <section className="right">
        </section>
      </article>
      <Footer />
    </>
  );
};

export default EditPassword;