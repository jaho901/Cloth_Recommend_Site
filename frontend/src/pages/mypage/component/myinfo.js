import '../scss/myinfo.scss'

const myinfo = ({info}) => {

  return (
    <article className='myinfo'>
      <section className='left'>
        <img src={info.imgUrl} alt='profileImage' />
      </section>
      <section className='center'>
        <div>
          <p className='title'>닉네임</p>
          <hr />
          <p>{info.nickname}</p>
        </div>
        <div>
          <p className='title'>성별</p>
          <hr />
          <p>{info.gender}</p>
        </div>
        <div className='myinfo-btn-div'></div>
      </section>
      <section className='right'>
        <div>
          <p className='title'>키</p>
          <hr />
          <p>{info.height} cm</p>
        </div>
        <div>
          <p className='title'>몸무게</p>
          <hr />
          <p>{info.weight} kg</p>
        </div>
        <div className='myinfo-btn-div'>
          <button>편집</button>
        </div>
      </section>
    </article>
  );
};

export default myinfo;