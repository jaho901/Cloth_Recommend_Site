/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import corr from './images/corr.png'
import incorr from './images/incorr.png'
import CustomAxios from '../../CustomAxios'
import './scss/signup.scss'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'



export default function Signup() {
  const history = useHistory()

  const [credentials, setCredentials] = useState({
    email: null, password: null, passwordConf: null
  })
  const [validData, setValidData] = useState({
    email: null, password: null, passwordConf: null
  })
  const [hover, setHover] = useState({
    email: false, password: false, passwordConf: false
  })

  const isValid = function(){
    return new Promise((resolve, reject) => {
      const errList = []
      const errKor = {email: '이메일', password: '비밀번호', passwordConf: '비밀번호 확인'}

      for (const key in validData){
        if (validData[key] !== 1){
          errList.push(errKor[key])
        }
      }
      if (errList.length){
        reject(errList)
      }
      else {
        resolve()
      }
    })
  } 

  const submit = function(event){
    event.preventDefault()
    ////////////// 회원가입  /////////////////
    isValid()
    .then(() => window.sessionStorage.setItem('credentials', JSON.stringify(credentials)))
    .then(() => {
      Swal.fire({
        text: '다음으로 이동합니다!',
        icon: "success",
        confirmButtonText: '확인',
        confirmButtonColor: 'green',
      }).then(() => history.push('moreinfo'))
    })
    .catch(err => {
      Swal.fire({
        text: err.join(', ') + (err[err.length-1] === '비밀번호' ? '를':'을') + ' 확인해주세요!',
        icon: "error",
        confirmButtonText: '확인',
        confirmButtonColor: 'red',
      })
    })
  }


  const validator = function(target){
    if (target === 'email'){
      const emailValidator = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
      const result = emailValidator.exec(credentials.email)
      if (result){
        /////////////// 이메일 중복검사 //////////////////
        CustomAxios({
          method: 'post',
          url: '/api_be/auth/email/confirms',
          data: {email: credentials.email}
        })
        .then(() => setValidData({...validData, email: 1}))
        .catch(() => setValidData({...validData, email: -1}))
      }
      else {
        setValidData({...validData, email: -1})
      }
    }
    else if (target ==='password'){
      const passValidator = /^(?=.*[a-zA-Z0-9])(?=.*[a-zA-Z!@#$%^&*])(?=.*[0-9!@#$%^&*]).{8,16}$/
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
      // side effect
      if (validData.passwordConf && credentials.password !== credentials.passwordConf){
        setValidData({...validData, passwordConf: -1})
      }
      else if (validData.passwordConf && credentials.password === credentials.passwordConf){
        setValidData({...validData, passwordConf: 1})
      }

    }
    else if (target === 'passwordConf'){
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


  return (
    <article className='signup-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logo" />
        </Link>
      </section>
      <section className='signup-body'>
        <h1>Sign Up</h1>
        <form onSubmit={event => submit(event)}>
          {/* 이메일 */}
          <label>
            이메일
            <div id='email-input'>
              <div className='input-box'>
                <input type="email" name="email" id="email"
                placeholder='이메일을 입력하세요'
                onInput={event => {setCredentials({...credentials, email: event.target.value}); setValidData({...validData, email: null})}} />

                <img className='validator-helper' src={validData.email === 1 ? corr:incorr}
                  style={{display: validData.email ? 'block':'none'}} alt="helper"
                  onMouseOver={() => setHover({...hover, email: true})}
                  onMouseOut={() => setHover({...hover, email: false})}/>

                <div className={`helper-message ${validData.email === 1 ? 'corr':'incorr'}`} 
                  style={{display: hover.email === true ? 'block':'none'}}>
                  <div className={`arrow ${validData.email === 1 ? 'arrow-corr':'arrow-incorr'}`} />
                  <p className="helper-message-corr" style={{display: validData.email === 1 ? 'block':'none'}}>
                    사용 가능한 이메일입니다!
                  </p>
                  <p className='helper-message-incorr' style={{display: validData.email === -1 ? 'block':'none'}}>
                    사용 불가능한 이메일입니다.
                  </p>
                </div>
              </div>
              <button className='eamil-validator' onClick={event => {event.preventDefault(); validator('email')}} >
                <span />
                <p>확인</p>
              </button>
            </div>
          </label>
          {/* 비밀번호 */}
          <label>
            비밀번호
            <div className='input-box'>
              <input type="password" name="password" id="password"
              placeholder='비밀번호는 8 ~ 16글자, 특수문자, 영어, 숫자 1개 이상 포함해야 합니다'
              onInput={event => setCredentials({...credentials, password: event.target.value})}
              onBlur={() => {validator('password')}} />

              <img className='validator-helper' src={validData.password === 1 ? corr:incorr}
                style={{display: validData.password ? 'block':'none'}} alt="helper"
                onMouseOver={() => setHover({...hover, password: true})}
                onMouseOut={() => setHover({...hover, password: false})}/>

              <div className={`helper-message ${validData.password === 1 ? 'corr':'incorr'}`} 
                style={{display: hover.password === true ? 'block':'none'}}>
                <div className={`arrow ${validData.password === 1 ? 'arrow-corr':'arrow-incorr'}`} />
                <p className="helper-message-corr" style={{display: validData.password === 1 ? 'block':'none'}}>
                  올바른 비밀번호 입니다!
                </p>
                <p className='helper-message-incorr' style={{display: validData.password === -1 ? 'block':'none'}}>
                  올바르지 않은 비밀번호입니다.
                </p>
              </div>
            </div>
          </label>
          {/* 비밀번호 확인 */}
          <label>
            비밀번호 확인
            <div className='input-box'>
              <input type="password" name="password-conf" id="password-conf"
              placeholder='비밀번호를 다시 입력하세요'
              onInput={event => setCredentials({...credentials, passwordConf: event.target.value})}
              onBlur={() => {validator('passwordConf')}} />

              <img className='validator-helper' src={validData.passwordConf === 1 ? corr:incorr}
                style={{display: validData.passwordConf ? 'block':'none'}} alt="helper"
                onMouseOver={() => setHover({...hover, passwordConf: true})}
                onMouseOut={() => setHover({...hover, passwordConf: false})}/>

              <div className={`helper-message ${validData.passwordConf === 1 ? 'corr':'incorr'}`} 
                style={{display: hover.passwordConf === true ? 'block':'none'}}>
                <div className={`arrow ${validData.passwordConf === 1 ? 'arrow-corr':'arrow-incorr'}`} />
                <p className="helper-message-corr" style={{display: validData.passwordConf === 1 ? 'block':'none'}}>
                  비밀번호가 일치합니다!
                </p>
                <p className='helper-message-incorr' style={{display: validData.passwordConf === -1 ? 'block':'none'}}>
                  비밀번호가 맞지 않습니다.
                </p>
              </div>
            </div>
          </label>
          <button>
            <span/>
            <p>다음</p>
          </button>
        </form>
        <Link to="/login">로그인</Link>
      </section>
    </article>
  )
}
