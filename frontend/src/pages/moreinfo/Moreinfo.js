import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import _default from './images/default.png'
import axios from 'axios'
import {S3} from "@aws-sdk/client-s3";
import './scss/moreinfo.scss'

export default function Moreinfo() {
  console.log(S3)
  const [credentials, setCredentials] = useState({
    profileImg: _default, nickname: null, height: null, weight: null, birth: null, gender: null
  })

  const date = new Date();

  const fileUpload = function(event){
    // const client = new S3({region: ''})
    // const bucketParams = {
    //   bucket: ''
    // }
    // client.createBucket
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setCredentials({...credentials, profileImg: url})
  }

  const isValid = function(){
    // eslint-disable-next-line no-useless-escape
    const validatorNickName = /[~!@#$%^&*()_\+\-\=\[\]{};\':",\\|.\/<>?]/
    const invalidKeys = []

    return new Promise((resolve, reject) => {
      if (!credentials.nickname || credentials.nickname.length < 2 || validatorNickName.test(credentials.nickname)){
        invalidKeys.push('닉네임')
      }
      if (!credentials.height || credentials.height < 100 || credentials.height > 210){
        invalidKeys.push('키')
      }
      if (!credentials.weight || credentials.weight < 30 || credentials.weight > 160){
        invalidKeys.push('몸무게')
      }
      if (!credentials.birth){
        invalidKeys.push('생년월일')
      }
      if (credentials.gender !== 0 && credentials.gender !== 1){
        invalidKeys.push('성별')
      }
      if (invalidKeys.length > 0){
        reject(invalidKeys)
      }
      else {
        resolve()
      }
    })
  }

  const submit = function(event){
    event.preventDefault();
    isValid()
    .then(() => {
      const baseUrl = 'https://ssafit.site/api_be'
      const firstCredentials = JSON.parse(window.localStorage.getItem('userInfo'))
      const userInfo = {...firstCredentials, ...credentials}

      axios({
        method: 'post',
        url: baseUrl + '/api_be/auth/signup',
        params: userInfo
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    })
    .catch(err => {
      alert(`${err.join(', ')}를 확인해주세요!!`)
    })
  }

  return (
    <article className='moreinfo-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logo" />
        </Link>
      </section>
      <section className='moreinfo-body'>
        <form onSubmit={event => submit(event)}>
          {/* 프로필사진 */}
          <label id='file-input' style={{backgroundImage: `url(${credentials.profileImg})`}}>
            <div className='input-box'>
              <input type="file" name="profile" id="profile" 
              onChange={event => fileUpload(event)} />
            </div>
          </label>
          {/* 닉네임 */}
          <label>
            닉네임
            <div className='input-box'>
              <input type="text" name="nickname" id="nickname"
              placeholder='닉네임을 입력하세요' maxLength='10'
              onInput={event => {credentials.nickname = event.target.value}} />
            </div>
          </label>
          {/* 키 */}
          <label>
            키
            <div className='input-box'>
              <input type="number" name="height" id="height" max='250' placeholder='키를 입력하세요'
              onInput={event => setCredentials({...credentials, height: event.target.value})} />
              <p className='unit'>cm</p>
            </div>
          </label>
          {/* 몸무게 */}
          <label>
            몸무게
            <div className='input-box'>
              <input type="number" name="weight" id="weight" placeholder='몸무게를 입력하세요'
              onInput={event => setCredentials({...credentials, weight: event.target.value})} />
              <p className='unit'>kg</p>
            </div>
          </label>
          {/* 생년월일 */}
          <label>
            생년월일
            <div className='input-box'>
              <input type="text" name="birth" id="birth" max={date.toISOString().slice(0, 10)} placeholder="날짜를 입력하세요"
              onInput={event => setCredentials({...credentials, birth: event.target.value})}
              onFocus={event => event.target.type = 'date'}
              onBlur={event => {if(!event.target.value){event.target.type = 'text'}}} />
            </div>
          </label>
          {/* 성별 */}
          <label id='gender'>
            성별
            <div className='input-box' id='gender-box'>
              <input type="radio" name="male" id="male" value='남성'
              onInput={() => setCredentials({...credentials, gender: 1})} />
              <label className='gender-label' htmlFor="male">남성</label>
              <input type="radio" name="male" id="female" value='여성'
              onInput={() => setCredentials({...credentials, gender: 0})} />
              <label className='gender-label' htmlFor="female">여성</label>
            </div>
          </label>
          <button>
            <span/>
            <p>회원가입</p>
          </button>
        </form>
        <Link to="/login">Login</Link>
      </section>
    </article>
  )
}