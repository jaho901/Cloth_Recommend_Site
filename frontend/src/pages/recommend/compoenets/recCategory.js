/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from "react-router-dom";
import '../scss/recCategory.scss'

const recCategory = ({cate}) => {
  let history = useHistory()

  const goToDetail = () => {
    history.push('/item/1')
  }

  return (
    <div className='rec-category'>
      <div className='rec-cate-text'>
        <h3>{cate}</h3>
        <p onClick={() => history.push(`/recommend/${cate.toLowerCase()}`)}>더보기</p>
      </div>
      <div className='rec-cate-cloth'>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card' onClick={() => goToDetail()}>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default recCategory;