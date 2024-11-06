import { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import ReactPlayer from 'react-player';

function App() {
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
          <img className='player_btn__icon' src='play.png' alt='play-icon'/>
        </Button>
        <Modal 
          className='player_modal' 
          title="Player" 
          open={isModalOpen} 
          onCancel={closeModal} 
          width='1000px' 
          height='700px' 
          centered
          footer={[
            <Button>Pause</Button>
          ]} 
        >
            <ReactPlayer url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8' width='100%' height='100%'/>
        </Modal>
      </div>
      
    </div>
  );
}

export default App;
