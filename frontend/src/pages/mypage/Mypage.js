import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import Myinfo from './component/myinfo'
import Recent from './component/recent'
import LikeCloth from './component/likeCloth'
import LikeCodi from './component/likeCodi'
import Faq from './component/faq'
import './scss/Mypage.scss'
import { user } from './data';
import { Col, Row } from 'react-bootstrap';

const Mypage = () => {
  const [myinfo, setMyinfo] = useState({})
  const [menu, setMenu] = useState('recent')
  const colorHanger = 'https://i.ibb.co/cTB977h/free-icon-clothes-hanger-3100599.png'
  const whiteHanger = 'https://i.ibb.co/18ktfCy/free-icon-clothes-hanger-3100575.png'

  useEffect(() => {
    setMyinfo(user)
  }, [])

  return (
    <article className='mypage'>
      <NavigationBar boldPath="MYPAGE" />
      <section className='mypage-myinfo'>
        <Myinfo info={myinfo} />
      </section>
      <hr style={{margin: 0}}/>
      <section className='hanger'>
        <Row>
          <Col md={2} className='menus'>
            <div className='menu' id={menu === 'recent' ? 'active' : ''} onClick={() => setMenu('recent')}>
              <img src={menu === 'recent' ? colorHanger : whiteHanger} alt='hanger' />
              <p>최근에 본 상품</p>
            </div>
            <div className='menu' id={menu === 'likeCloth' ? 'active' : ''} onClick={() => setMenu('likeCloth')}>
              <img src={menu === 'likeCloth' ? colorHanger : whiteHanger} alt='hanger' />
              <p>찜한 옷</p>
            </div>
            <div className='menu' id={menu === 'likeCodi' ? 'active' : ''} onClick={() => setMenu('likeCodi')}>
              <img src={menu === 'likeCodi' ? colorHanger : whiteHanger} alt='hanger' />
              <p>찜한 코디</p>
            </div>
            <div className='menu' id={menu === 'faq' ? 'active' : ''} onClick={() => setMenu('faq')}>
              <img src={menu === 'faq' ? colorHanger : whiteHanger} alt='hanger' />
              <p>FAQ</p>
            </div>
          </Col>
          <Col md={10} className='content'>
            {menu === 'recent' && <Recent />}
            {menu === 'likeCloth' && <LikeCloth />}
            {menu === 'likeCodi' && <LikeCodi />}
            {menu === 'faq' && <Faq />}
          </Col>
        </Row>
      </section>
      <Footer />
    </article>
  );
};

export default Mypage;