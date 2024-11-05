import { useRef, useState } from 'react';
import { Button, Modal } from 'antd';

function App() {
  const videoRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className='container'>
      <div className='player'>
        <Button className='player_btn' onClick={openModal}>
          <span className='player_btn__firstLine line'></span>
          <span className='player_btn__secondLine line'></span>
          <span className='player_btn__thirdLine line'></span>
        </Button>
        <Modal className='player_modal' title="Player" footer={null} open={isModalOpen} onCancel={closeModal} width={1000} height={700}>
          <video className='player_modal__video' ref={videoRef} src='https://www.youtube.com/watch?v=22QAcwuGqFs'>
            {/* <source src='https://www.youtube.com/watch?v=22QAcwuGqFs' type='video/mp4' /> */}
          </video>
        </Modal>
      </div>
      
    </div>
  );
}

export default App;
